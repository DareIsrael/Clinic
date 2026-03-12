import mongoose from 'mongoose';

const broadcastMessageSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['waitlist', 'appointment'],
        required: true,
    },
    subject: {
        type: String,
        required: true,
        trim: true,
    },
    message: {
        type: String,
        required: true,
    },
    statusFilter: {
        type: String,
        default: 'all',
    },
    targetEmail: {
        type: String,
        trim: true,
        lowercase: true,
    },
    recipientCount: {
        type: Number,
        default: 0,
    },
    sent: {
        type: Number,
        default: 0,
    },
    failed: {
        type: Number,
        default: 0,
    },
    sentBy: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    timestamps: true,
});

broadcastMessageSchema.index({ createdAt: -1 });
broadcastMessageSchema.index({ type: 1 });

export default mongoose.models.BroadcastMessage || mongoose.model('BroadcastMessage', broadcastMessageSchema);
