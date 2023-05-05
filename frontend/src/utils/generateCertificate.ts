import { CertificateFormats } from "@/types";
import { CompleteCertStructOutput } from "@/types/typechain-types/contracts/endpoints/CertificateEndpoint";
// import { createCanvas, loadImage } from "canvas";
import { createCanvas, loadImage } from "@napi-rs/canvas";
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
    `/public/img/certificate_template_even_smaller.png`
  );
  // const certificateTemplatePath = `https://i.ibb.co/qsyqB3T/certificate-template.jpg`;
  const certImage = await loadImage(certificateTemplatePath);
  console.log("Image loaded");

  // Generate Certificate

  // Load image into Canvas
  const canvas = createCanvas(certImage.width, certImage.height);
  console.log(canvas.width, canvas.height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(certImage, 0, 0, certImage.width, certImage.height);
  console.log("Image drawn onto canvas");

  // Context settings
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  // Draw details onto Certificate

  // Nature
  const accreditationNature = certificateData.accreditation.nature;
  ctx.font = "70px Times New Roman";
  ctx.fillStyle = "#666666";
  ctx.fillText("of " + accreditationNature, 1350, 450);
  console.log("Nature drawn");

  // Accreditation title
  const title = certificateData.accreditation.title;
  ctx.font = "100px Times New Roman";
  ctx.fillStyle = "#000000";
  ctx.fillText(title, 1150, 600);
  console.log("Title drawn");

  ctx.font = "40px Times New Roman";
  ctx.fillText("Issued by", 1150, 660);
  // Issuer name
  const issuerName = certificateData.issuer.name;
  ctx.font = "80px Times New Roman";
  ctx.fillText(issuerName, 1150, 750);
  ctx.font = "60px Segoe Script";
  ctx.fillText(issuerName, 1515, 1200);
  console.log("Issuer name drawn");

  ctx.font = "40px Times New Roman";
  ctx.fillText("to", 1150, 800);
  // Applicant name
  const applicantName = certificateData.applicant.name;
  ctx.font = "90px Segoe Script";
  ctx.fillText(applicantName, 1150, 890);
  console.log("Applicant name drawn");

  ctx.font = "40px Times New Roman";
  ctx.fillText("with", 1150, 950);
  // Level
  const certLevel = certificateData.certificate.level;
  ctx.font = "70px Times New Roman";
  ctx.fillText(certLevel, 1150, 1030);
  console.log("Level drawn");

  // // Duration
  // const accreditationDuration = certificateData.accreditation.duration;
  // if (!accreditationDuration.eq(0)) {
  //   // TODO: format number into correct time
  //   ctx.fillText(accreditationDuration.toString(), 1150, 1200);
  //   console.log("Duration drawn");
  // }

  // Remarks
  const remarks = certificateData.certificate.remarks;
  ctx.font = "55px Times New Roman";
  ctx.fillStyle = "#000000";
  ctx.fillText(`(${remarks})`, 1150, 1100);
  console.log("Remarks drawn");

  // // Event ID
  // if (certificateData.certificate.eventId !== "") {
  //   const eventId = certificateData.certificate.eventId;
  //   ctx.fillText(eventId, 1150, 1400);
  //   console.log("EventId drawn");
  // }

  // Issue time
  const issueTime = certificateData.certificate.createdAt;
  const issueDate: Date = new Date(issueTime.mul(1000).toNumber());
  ctx.font = "60px Times New Roman";
  ctx.fillText(
    `${issueDate.getFullYear()}-${issueDate.getMonth()}-${issueDate.getDate()}`,
    860,
    1210
  );
  console.log("Issue time drawn");

  // Company logoUrl
  if (certificateData.issuer.logoUrl !== "") {
    const logoUrl = certificateData.issuer.logoUrl;
    try {
      const logoImage = await loadImage(logoUrl);
      ctx.drawImage(logoImage, 200, 820, 400, 400);
      console.log("Company logo drawn");
    } catch (error) {
      console.log("Failed to draw company logo, but can proceed");
    }
  }

  console.log("Certificate drawn");

  // Return Buffer object for API to send

  // // node-canvas
  // switch (exportType) {
  //   case CertificateFormats.JPG:
  //     return canvas.toBuffer("image/jpeg", { quality: 1 });
  //   case CertificateFormats.PNG:
  //     return canvas.toBuffer("image/png", { compressionLevel: 0 });
  //   case CertificateFormats.PDF:
  //     return canvas.toBuffer("application/pdf", {
  //       title: `Certificate for ${certificateData.accreditation.title}`,
  //       author: `${certificateData.issuer.name}`,
  //       // subject: string,
  //       // keywords: string,
  //       creator: `${certificateData.issuer.name}`,
  //       creationDate: new Date(certificateData.certificate.createdAt.mul(1000).toNumber()),
  //     });
  // }

  // @napi-rs/canvas
  switch (exportType) {
    case CertificateFormats.JPG:
      return canvas.toBuffer("image/jpeg", 2160);
    case CertificateFormats.PNG:
      return canvas.toBuffer("image/png");
  }
};
