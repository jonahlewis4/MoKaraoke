# Mokarake - Karaoke Video Generator

## What This Application Does

**Mokarake** is a web application that allows users to create karaoke videos by uploading an audio file and a background image. The app generates a karaoke-style video combining the user's audio with their chosen background image.

## How to Set It Up and Run It

### Prerequisites

- Docker
- npm (Node Package Manager)

### Setup Instructions

#### Step 1: Set Up the Database

1. Navigate to the Docker directory:
   ```bash
   cd docker
   ```

2. Build and start the Docker containers:
   ```bash
   make
   ```

3. Access the database interface in your browser at `http://localhost:8000`
    - **Username**: `supabase`
    - **Password**: `this_password_is_insecure_and_should_be_updated`

4. Create the videos table:
    - Open the SQL editor in the database interface
    - Run the SQL query found in `docker/schema.sql` to create the `videos` table in the `public` schema

#### Step 2: Set Up the Application

1. Open a new terminal window and navigate to the app directory:
   ```bash
   cd app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   npm start
   ```

4. Access the application in your browser (typically at `http://localhost:3000`)

## Key Features and Functionality

### 1. **File Upload**
- Upload audio files for your karaoke track
- Upload background images to customize your video visuals

### 2. **Video Generation**
- Automatically generates karaoke videos from uploaded content
- Combines audio and background image into a single video file

### 3. **File Download**
- Download generated karaoke videos to your device

### 4. **User-Friendly Form Experience**
- Intuitive interface for uploading files and managing video generation
- Clear feedback during the upload and generation process

## Assumptions and Limitations

### Assumptions

1. **No Authentication**: The application does not implement user authentication. All users have access to all functionality.

2. **Mock AI Backend**: Currently, there is no actual AI-powered video generation. Instead, the app returns a randomly selected video from a pre-defined list.

3. **Local Development**: The setup assumes a local development environment.

4. **Database Access**: Users have direct access to the Supabase database interface with the default credentials.

### Limitations

1. **Security**:
    - Default database password is insecure and should be changed for any production use
    - No user authentication or authorization
    - No file validation or security checks

2. **Video Generation**: The current implementation does not actually process the uploaded audio and image files. Video generation is simulated.

3. **Storage**: No file size limits or storage management implemented.

4. **Single User**: Not designed for multi-user concurrent access.

5. **Production Readiness**: This is a development/prototype version not suitable for production deployment.

### Security Warning

⚠️ **Important**: The default database password is intentionally insecure. If deploying beyond local development, you must:
- Change the database password
- Implement proper authentication
- Add file upload validation and sanitization
- Configure proper CORS and security headers

---

**Note**: This application is a prototype demonstrating file upload/download workflows and form interaction. Future versions should implement actual video processing and proper security measures.