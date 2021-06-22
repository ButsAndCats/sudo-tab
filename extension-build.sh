rm -rf .next/ out/;
rm sudo-tab.zip;

yarn next build;
yarn next export;

mkdir ./out
cp manifest.json ./out;

cp -R ./images ./out

mv ./out/_next ./out/next
cd ./out && grep -rli '_next' * | xargs -I@ sed -i '' 's/_next/next/g' @;

zip -r -FS ../sudo-tab.zip *;