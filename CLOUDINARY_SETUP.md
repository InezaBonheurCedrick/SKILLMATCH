# Cloudinary Setup Guide

This guide will help you set up Cloudinary for resume uploads in the SkillMatch application.

## Prerequisites

- A Cloudinary account (sign up at https://cloudinary.com if you don't have one)
- Cloudinary packages are already installed in both frontend and backend

## Step 1: Get Your Cloudinary Credentials

1. Log in to your Cloudinary Dashboard: https://cloudinary.com/console
2. Go to **Dashboard** - you'll see your credentials:
   - **Cloud Name** (e.g., `your-cloud-name`)
   - **API Key** (not needed for unsigned uploads)
   - **API Secret** (not needed for unsigned uploads)

## Step 2: Create an Unsigned Upload Preset

1. In Cloudinary Dashboard, go to **Settings** → **Upload**
2. Scroll down to **Upload presets** section
3. Click **Add upload preset**
4. Configure the preset:
   - **Preset name**: `skillmatch_resumes` (or any name you prefer)
   - **Signing mode**: Select **Unsigned** (this allows direct uploads from frontend)
   - **Folder**: `resumes` (optional, but recommended for organization)
   - **Resource type**: `Auto` (to handle PDF, DOC, DOCX files)
   - **Allowed formats**: You can restrict to `pdf,doc,docx` if desired
   - **Max file size**: Set to `5MB` or your preferred limit
5. Click **Save**

## Step 3: Configure Frontend Environment Variables

Create a `.env` file in the `frontend` directory (or update your existing one):

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
VITE_CLOUDINARY_UPLOAD_PRESET=skillmatch_resumes
```

Replace `your-cloud-name` with your actual Cloudinary cloud name.

## Step 4: Test the Integration

1. Start your frontend and backend servers
2. Navigate to an opportunity page
3. Click "Apply" and try uploading a resume
4. The resume should upload to Cloudinary and the URL will be saved in the database
5. In the admin dashboard, you should be able to view the resume by clicking the external link icon or the "View Resume" option

## How It Works

1. **User Uploads Resume**: When a user submits an application, the resume file is uploaded directly to Cloudinary from the frontend
2. **Cloudinary Returns URL**: After successful upload, Cloudinary returns a secure URL (e.g., `https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/resumes/resume.pdf`)
3. **URL Saved to Database**: The Cloudinary URL is saved in the `resumeUrl` field of the Application model
4. **Admin Views Resume**: Admins can view resumes online by clicking the external link icon in the applications table

## Security Notes

- Using **unsigned upload presets** is safe for public uploads but limits control
- For production, consider:
  - Setting up signed uploads through your backend
  - Adding file type validation
  - Implementing file size limits
  - Adding virus scanning (Cloudinary offers this as a paid feature)

## Troubleshooting

### Upload Fails
- Check that your Cloudinary cloud name is correct
- Verify the upload preset name matches exactly
- Ensure the upload preset is set to "Unsigned"
- Check browser console for specific error messages

### Resume Not Viewable
- Verify the `resumeUrl` is saved correctly in the database
- Check that the Cloudinary URL is accessible (try opening it directly in a browser)
- Ensure CORS is properly configured in Cloudinary (should work by default)

### File Size Errors
- Increase the max file size in your Cloudinary upload preset
- Or reduce the file size limit in `ApplicationModal.tsx` (currently 5MB)

## Additional Resources

- Cloudinary Documentation: https://cloudinary.com/documentation
- Upload Presets Guide: https://cloudinary.com/documentation/upload_presets
- React Upload Examples: https://cloudinary.com/documentation/react_integration
