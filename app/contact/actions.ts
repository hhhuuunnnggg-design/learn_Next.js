'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

// Define the validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactFormState = {
  success?: boolean;
  error?: string;
  fieldErrors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
};

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  try {
    // Extract form data
    const rawData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };

    // Validate the data
    const result = contactSchema.safeParse(rawData);

    if (!result.success) {
      return {
        error: 'Please fix the errors below',
        fieldErrors: result.error.flatten().fieldErrors,
      };
    }

    const { name, email, message } = result.data;

    // Simulate sending the message (in a real app, you'd save to database or send email)
    console.log('Contact form submission:', {
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    });

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In a real application, you would:
    // 1. Save to database
    // 2. Send email notification
    // 3. Send auto-reply to user
    // 4. Log the submission

    // Revalidate any relevant paths if needed
    revalidatePath('/contact');

    return {
      success: true,
    };
  } catch (error) {
    console.error('Contact form error:', error);
    return {
      error: 'Something went wrong. Please try again later.',
    };
  }
}
