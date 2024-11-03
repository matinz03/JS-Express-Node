/* 

1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";
inquirer
  .prompt([{ message: "type in your desired website", name: "URL" }])
  .then((answers) => {
    const feedback = answers.URL;
    var qr_svg = qr.image(feedback);
    qr_svg.pipe(fs.createWriteStream("qr_img1.png"));

    fs.writeFile("URL.txt", feedback, (err) => {
      if (err) throw err;
      console.log("The file has been saved succesfully")
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      ("could not handle");
      // Prompt couldn't be rendered in the current environment
    } else {
      ("something went wrong");
      // Something else went wrong
    }
  });
