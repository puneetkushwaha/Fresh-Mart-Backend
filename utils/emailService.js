import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendOrderConfirmationEmail = async (order, user) => {
    try {
        const mailOptions = {
            from: `"FreshMart" <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: `Order Confirmation - Order #${order._id}`,
            html: `
                <h1>Thank you for your order!</h1>
                <p>Hi ${user.name},</p>
                <p>We have received your order.</p>
                <h2>Order ID: ${order._id}</h2>
                <p><strong>Total Amount:</strong> ₹${order.totalPrice}</p>
                <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
                <h3>Order Items:</h3>
                <ul>
                    ${order.orderItems.map(item => `<li>${item.name} - ${item.qty} x ₹${item.price}</li>`).join('')}
                </ul>
                <p>We will notify you once your order is shipped.</p>
            `
        };

        const adminMailOptions = {
            from: `"FreshMart System" <${process.env.EMAIL_USER}>`,
            to: process.env.ADMIN_EMAIL, // New Admin Email from request
            subject: `New Order Received - #${order._id}`,
            html: `
                <h1>New Order Alert!</h1>
                <p><strong>Customer:</strong> ${user.name} (${user.email})</p>
                <p><strong>Order ID:</strong> ${order._id}</p>
                <p><strong>Total Amount:</strong> ₹${order.totalPrice}</p>
                <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
                ${order.paymentMethod === 'UPI / NetBanking' ? `<p><strong>UTR:</strong> ${order.paymentResult.id || 'Not Provided'}</p>` : ''}
            `
        };

        await transporter.sendMail(mailOptions);
        await transporter.sendMail(adminMailOptions);
        console.log('Order confirmation emails sent');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

export const sendOrderDeliveredEmail = async (order, user) => {
    try {
        const mailOptions = {
            from: `"FreshMart" <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: `Your Order Has Been Delivered! - Order #${order._id}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h1 style="color: #22c55e;">Great News! Your order is here.</h1>
                    <p>Hi ${user.name},</p>
                    <p>We're happy to inform you that your order <strong>#${order._id}</strong> has been successfully delivered. We hope you enjoy your fresh groceries!</p>
                    
                    <div style="background-color: #f0fdf4; padding: 20px; border-radius: 15px; margin: 20px 0; text-align: center;">
                        <h3 style="margin-top: 0;">How was your experience?</h3>
                        <p>Your feedback helps us grow. Please take a moment to review your items.</p>
                        <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/orders" 
                           style="background-color: #22c55e; color: white; padding: 12px 25px; border-radius: 10px; text-decoration: none; font-weight: bold; display: inline-block;">
                           Review Now
                        </a>
                    </div>

                    <h3>Order Summary:</h3>
                    <ul>
                        ${order.orderItems.map(item => `<li>${item.name} - ${item.qty} x ₹${item.price}</li>`).join('')}
                    </ul>
                    <p><strong>Total Paid:</strong> ₹${order.totalPrice}</p>
                    
                    <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
                    <p style="font-size: 12px; color: #999; text-align: center;">FreshMart - Delivered fresh to your doorstep.</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('Order delivery confirmation email sent to:', user.email);
    } catch (error) {
        console.error('Error sending delivery email:', error);
    }
};
