// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  ContractAddresses,
  certificateEndpointABI,
  networkConfig,
} from "@/blockchain/contracts.config";
import { CertificateFormats } from "@/types";
// import { createCanvas, loadImage } from "canvas";
import { ethers } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";
// import path from "path";
import { generateCertificate } from "./generateCertificate";

const fileFormats = {
  PDF: "application/pdf",
  JPG: "image/jpeg",
  PNG: "image/png",
};

// Helper function to generate certificate image
// const generateCertificate = async (
//   certificateData: any,
//   exportType: CertificateFormats
// ): Promise<Buffer> => {
//   console.log("Certificate data:", certificateData);
//   console.log("\nBegin to generate Certificate ...");
//   // Load image
//   const certificateTemplatePath: string = path.join(
//     process.cwd(),
//     // `/public/img/certificate_template.jpeg`
//     `https://i.ibb.co/qsyqB3T/certificate-template.jpg`
//   );
//   const certImage = await loadImage(certificateTemplatePath);
//   console.log("Image loaded");

//   // // Process fonts
//   // const fontFilePath = ""; // TODO(Good to have): add font file path
//   // registerFont(fontFilePath, { family: "jin" }); // TODO(Good to have): change family attribute
//   // console.log("Font registered");

//   // Generate Certificate

//   // Load image into Canvas
//   const canvas = createCanvas(certImage.width, certImage.height);
//   const ctx = canvas.getContext("2d");
//   ctx.drawImage(certImage, 0, 0, certImage.width, certImage.height);
//   console.log("Image drawn onto canvas");

//   // Draw details onto Certificate
//   // TODO
//   // Certificate title

//   // For reference: past example

//   // ctx.font = '32px "jin"';

//   // for (let i = 0; i < id.length; i++) {
//   //   ctx.fillText(id.split("")[i], 840, 240 + 32 * i);
//   // }

//   // console.log("ID drawn");

//   // ctx.font = '160px "Trebuchet MS"';
//   // ctx.textAlign = "center";
//   // ctx.textBaseline = "alphabetic";

//   // ctx.translate(668, 175);
//   // ctx.rotate(Math.PI / 2);

//   // ctx.fillText(("0" + quantity.toString()).slice(-2), 0, 0);

//   // console.log("amount drawn");

//   // Return Buffer object for API to send
//   switch (exportType) {
//     case CertificateFormats.JPG:
//       return canvas.toBuffer("image/jpeg", { quality: 1 });
//     case CertificateFormats.PNG:
//       return canvas.toBuffer("image/png", { compressionLevel: 0 });
//     case CertificateFormats.PDF:
//       return canvas.toBuffer("application/pdf", {
//         title: `Certificate for ${certificateData.accreditation.title}`,
//         author: `${certificateData.issuer.name}`,
//         // subject: string,
//         // keywords: string,
//         creator: `${certificateData.issuer.name}`,
//         creationDate: new Date(certificateData.certificate.createdAt),
//       });
//   }
// };

/**
 * This API uses node-canvas to return a rendered image of a certificate
 * There are 2 possible ways to obtain data for generating the Certificate
 * 1. Get from blockchain - involves getting address wallet to approve spending money, getting data from endpoint
 * 2. Pass data directly - need verify integrity
 *
 * Required body data:
 * - exportType
 *
 * 2 choose 1 body data:
 * - walletAddress
 * - certData
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // None of the data obtaining methods are provided
  if (!req.body && !req.body.certData && !req.body.walletAddress) {
    res.status(403).send("Error: did not provide wallet address.");
  }

  const { certificateId: certIdStr } = req.query as { certificateId: string };
  let completeCert: any | null = null;
  const certificateId = parseInt(certIdStr);
  const exportType: CertificateFormats = req.body?.exportType;

  if (req.body.certData) {
    // Use provided data
    try {
      // TODO(Good to have): verify integrity of cert data by adding type
      const certData: any = req.body.certData! as any;
      if ((certData.certificate.id as number) !== certificateId) {
        res.status(403).send("Certificate ID mismatch.");
      }
      completeCert = certData;
    } catch (error) {
      console.log("Error with certData:");
      console.log(error);
      res.status(404).send("Unable to obtain certificate data.");
    }
  } else if (req.body.walletAddress) {
    // Use given wallet address to obtain money
    const userAddress = req.body.walletAddress! as string;
    const { rpc } = networkConfig;
    ContractAddresses.CERTIFICATE_ENDPOINT;
    const provider = new ethers.providers.JsonRpcProvider(rpc);
    const contract = new ethers.Contract(
      ContractAddresses.CERTIFICATE_ENDPOINT,
      certificateEndpointABI,
      provider
    );
    try {
      completeCert = contract.getCompleteCert();
    } catch (error) {
      console.log("Error with getCompleteCert():");
      res.status(404).send("Unable to obtain certificate data.");
    }
  }

  if (!completeCert) {
    res.status(404).send("Unable to obtain certificate data.");
  }

  // TODO(Good to have): use node-canvas to draw cert
  // TODO(Good to have): return image buffer of drawn cert
  const certificateBuffer = await generateCertificate(
    completeCert!,
    exportType
  );
  res.setHeader("Content-Type", fileFormats[exportType]);
  return res.send(certificateBuffer);
}
