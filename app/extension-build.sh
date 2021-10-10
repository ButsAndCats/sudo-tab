# Remove previous builds
rm -rf .next/ out/;
rm sudo-tab.zip;

# Build new
yarn next build;
yarn next export;

# Create out directory and move the manifest to it
mkdir ./out
cp manifest.json ./out;

# Copy all the static images to the out dir
cp -R ./images ./out

# Remove the underscore from the next directory
mv ./out/_next ./out/next
# Replace all references to the next directory
cd ./out && grep -rli '_next' * | xargs -I@ sed -i '' 's/_next/next/g' @;

# Create a zip
zip -r -FS ../sudo-tab.zip *;