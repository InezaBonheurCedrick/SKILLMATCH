import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUserMethods {
  correctPassword(candidatePassword: string, userPassword: string): Promise<boolean>;
}

export interface IUser extends Document, IUserMethods {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>({
  email: { 
    type: String, 
    required: [true, 'Please provide an email'], 
    unique: true,
    lowercase: true,
  },
  password: { 
    type: String, 
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
  
});

userSchema.methods.correctPassword = async function(candidatePassword: string, userPassword: string) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

export const User = mongoose.model<IUser>('User', userSchema);