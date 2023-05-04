import { CertificateFormats } from "@/types";
import { CompleteCertStructOutput } from "@/types/typechain-types/contracts/endpoints/CertificateEndpoint";
import { createCanvas, loadImage } from "canvas";
import path from "path";

export const generateCertificate = async (
  certificateData: CompleteCertStructOutput,
  exportType: CertificateFormats
): Promise<Buffer> => {
  console.log("Certificate data:", certificateData);
  console.log("\nBegin to generate Certificate ...");
  // Load image
  const certificateTemplatePath: string = path.join(
    process.cwd(),
    // `/public/img/certificate_template.jpeg`
    `https://i.ibb.co/qsyqB3T/certificate-template.jpg`
  );
  const certImage = await loadImage(certificateTemplatePath);
  console.log("Image loaded");

  // // Process fonts
  // const fontFilePath = ""; // TODO(Good to have): add font file path
  // registerFont(fontFilePath, { family: "jin" }); // TODO(Good to have): change family attribute
  // console.log("Font registered");

  // Generate Certificate

  // Load image into Canvas
  const canvas = createCanvas(certImage.width, certImage.height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(certImage, 0, 0, certImage.width, certImage.height);
  console.log("Image drawn onto canvas");

  // Draw details onto Certificate
  // TODO
  // Certificate title

  // For reference: past example

  // ctx.font = '32px "jin"';

  // for (let i = 0; i < id.length; i++) {
  //   ctx.fillText(id.split("")[i], 840, 240 + 32 * i);
  // }

  // console.log("ID drawn");

  // ctx.font = '160px "Trebuchet MS"';
  // ctx.textAlign = "center";
  // ctx.textBaseline = "alphabetic";

  // ctx.translate(668, 175);
  // ctx.rotate(Math.PI / 2);

  // ctx.fillText(("0" + quantity.toString()).slice(-2), 0, 0);

  // console.log("amount drawn");

  // Return Buffer object for API to send
  switch (exportType) {
    case CertificateFormats.JPG:
      return canvas.toBuffer("image/jpeg", { quality: 1 });
    case CertificateFormats.PNG:
      return canvas.toBuffer("image/png", { compressionLevel: 0 });
    case CertificateFormats.PDF:
      return canvas.toBuffer("application/pdf", {
        title: `Certificate for ${certificateData.accreditation.title}`,
        author: `${certificateData.issuer.name}`,
        // subject: string,
        // keywords: string,
        creator: `${certificateData.issuer.name}`,
        creationDate: new Date(certificateData.certificate.createdAt.mul(1000).toNumber()),
      });
  }
};
