const createTransporter = require('../config/mailer');

const SENDER_EMAIL = process.env.EMAIL_FROM || '"Party Decoration Store" <noreply@partydecorations.com>';

/**
 * Send Welcome Email to newly registered user
 */
const sendWelcomeEmail = async (user) => {
  try {
    const transporter = await createTransporter();
    const mailOptions = {
      from: SENDER_EMAIL,
      to: user.email,
      subject: 'Welcome to Party Decoration Store! 🎉',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #e91e63; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">Welcome to Party Decoration! 🎈</h1>
          </div>
          <div style="padding: 20px; color: #333; line-height: 1.6;">
            <h2>Hi ${user.name},</h2>
            <p>Thank you for creating an account with Party Decoration Store. We are thrilled to have you onboard!</p>
            <p>Explore our exclusive collection of balloons, banners, lights, theme decorations, and party combos designed to make your celebrations unforgettable.</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="http://localhost:5000" style="background-color: #e91e63; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Shop Now</a>
            </div>
            <p>If you have any questions, feel free to reply to this email.</p>
            <p>Best regards,<br/>The Party Decoration Team</p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[Email Service] Welcome email dispatched to ${user.email} (MessageId: ${info.messageId})`);
    return info;
  } catch (error) {
    console.error('[Email Service Error]', error.message);
  }
};

/**
 * Send Password Reset Email with reset token link
 */
const sendPasswordResetEmail = async (user, resetToken) => {
  try {
    const transporter = await createTransporter();
    const resetUrl = `http://localhost:5000/api/auth/reset-password/${resetToken}`;

    const mailOptions = {
      from: SENDER_EMAIL,
      to: user.email,
      subject: 'Password Reset Request - Party Decoration Store',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #3f51b5; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">Password Reset Request</h1>
          </div>
          <div style="padding: 20px; color: #333; line-height: 1.6;">
            <h2>Hi ${user.name},</h2>
            <p>You requested a password reset for your Party Decoration account. Click the button below to reset your password:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" style="background-color: #3f51b5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
            </div>
            <p>This password reset token is valid for 10 minutes. If you did not request a password reset, please ignore this email.</p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[Email Service] Password reset email dispatched to ${user.email}`);
    return info;
  } catch (error) {
    console.error('[Email Service Error]', error.message);
  }
};

/**
 * Send Order Confirmation & Payment Success Email
 */
const sendOrderConfirmationEmail = async (user, order) => {
  try {
    const transporter = await createTransporter();

    const itemsList = order.items
      .map(
        (item) => `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">₹${item.price}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">₹${item.itemSubtotal}</td>
        </tr>
      `
      )
      .join('');

    const mailOptions = {
      from: SENDER_EMAIL,
      to: user.email,
      subject: `Order Confirmation #${order.orderId || order._id} - Party Decoration Store 🎉`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #4caf50; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">Order Confirmed! 📦</h1>
          </div>
          <div style="padding: 20px; color: #333; line-height: 1.6;">
            <h2>Hi ${user.name},</h2>
            <p>Thank you for your order! We have received your payment and your party supplies order is now being processed.</p>
            <h3>Order Details</h3>
            <p><strong>Order ID:</strong> ${order.orderId || order._id}</p>
            <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>

            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <thead>
                <tr style="background-color: #f5f5f5;">
                  <th style="padding: 8px; text-align: left;">Product</th>
                  <th style="padding: 8px; text-align: center;">Qty</th>
                  <th style="padding: 8px; text-align: right;">Price</th>
                  <th style="padding: 8px; text-align: right;">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                ${itemsList}
              </tbody>
            </table>

            <div style="margin-top: 20px; text-align: right; line-height: 1.8;">
              <p>Items Subtotal: <strong>₹${order.itemsSubtotal}</strong></p>
              <p>Shipping Fee: <strong>₹${order.shippingFee}</strong></p>
              ${order.discount ? `<p>Discount Applied: <strong style="color: green;">-₹${order.discount}</strong></p>` : ''}
              <h3 style="margin: 5px 0;">Grand Total: <span style="color: #e91e63;">₹${order.grandTotal}</span></h3>
            </div>

            <p style="margin-top: 30px;">We will notify you once your order has been shipped.</p>
            <p>Best regards,<br/>Party Decoration Team</p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[Email Service] Order confirmation email dispatched to ${user.email}`);
    return info;
  } catch (error) {
    console.error('[Email Service Error]', error.message);
  }
};

/**
 * Send Order Status Update Email (e.g. Shipped, Delivered, Cancelled)
 */
const sendOrderStatusUpdateEmail = async (user, order, newStatus) => {
  try {
    const transporter = await createTransporter();

    const mailOptions = {
      from: SENDER_EMAIL,
      to: user.email,
      subject: `Order Status Update #${order.orderId || order._id}: ${newStatus}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #2196f3; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">Order Status Update</h1>
          </div>
          <div style="padding: 20px; color: #333; line-height: 1.6;">
            <h2>Hi ${user.name},</h2>
            <p>The status of your order <strong>#${order.orderId || order._id}</strong> has been updated to:</p>
            <div style="text-align: center; margin: 20px 0; background-color: #e3f2fd; padding: 15px; border-radius: 5px;">
              <h2 style="margin: 0; color: #1976d2;">${newStatus}</h2>
            </div>
            <p>Thank you for shopping with Party Decoration Store!</p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[Email Service] Order status email dispatched to ${user.email}`);
    return info;
  } catch (error) {
    console.error('[Email Service Error]', error.message);
  }
};

module.exports = {
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendOrderConfirmationEmail,
  sendOrderStatusUpdateEmail,
};
