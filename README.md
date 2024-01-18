# Dependencies
- [Node.js](https://nodejs.org)
- Access to a Zipline instance
- A Windows machine (may add support for other OS in the future)

# Features
- Upload via drag and drop or a specified file path which gets passed as an argument (useful for implementing into applications).
- Copies the URL to your clipboard once the file is uploaded (Windows only currently).

# How to use
1. Clone the repo by either running `git clone https://github.com/wraithy/zipline-uploader` in your terminal or via the "Code" dropdown button.
2. Open a terminal/change directory to the "zipline-uploader" directory and run `npm i` to download all of the required packages.
3. Edit the ".env.example" file and fill the variables with your credentials and rename the file to just ".env".
4. Either drag and drop a file onto the "upload.bat" file or open it and enter the path to your chosen file and hit enter.

Once the file has been specified, it will begin uploading and will copy the URL to your clipboard once the upload is complete. Please note that chunked files will need some time to process so your file may not be ready to view straight away.
