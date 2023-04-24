// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ContractAddresses, networkConfig } from "@/blockchain/contracts.config";
import { createCanvas, loadImage, registerFont } from "canvas";
import { ethers } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";

const fileFormats = {
  PDF: "application/pdf",
  JPG: "image/jpeg",
  PNG: "image/png",
};

// Helper function to generate certificate image
const generateCertificate = async (certificateData: any, exportType: CertificateFormats) => {
  console.log("Certificate data:", certificateData);
  console.log("\nBegin to generate Certificate ...");
  // Load image
  const certificateTemplatePath = "@/img/cert_template.png";
  const certImage = await loadImage(certificateTemplatePath);
  console.log("Image loaded");

  // Process fonts
  const fontFilePath = ""; // TODO: add font file path
  registerFont(fontFilePath, { family: "jin" }); // TODO: change family attribute
  console.log("Font registered");

  // Generate Certificate

  // Load image into Canvas
  const canvas = createCanvas(certImage.width / 10, certImage.height / 10);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(certImage, 0, 0, certImage.width / 10, certImage.height / 10);
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
        // TODO: configure these
        //     title?: string
        // author?: string
        // subject?: string
        // keywords?: string
        // creator?: string
        // creationDate?: Date
        // modDate?: Date
      });
  }
};

// TODO: add CompleteCert type to NextApiResponse<> after compilation from deploying smart contracts
/**
 * This API uses node-canvas to return a rendered image of a certificate
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userAddress = req.headers?.walletAddress as string | undefined;
  if (!userAddress) {
    res.status(403).send("Error: did not provide wallet address.");
  }
  const { certificateId: certIdStr } = req.query as { certificateId: string };
  const certificateId = parseInt(certIdStr);
  const exportType: CertificateFormats = req.body?.exportType;

  const { rpc } = networkConfig;
  ContractAddresses.CERTIFICATE_ENDPOINT;
  const provider = new ethers.providers.JsonRpcProvider(rpc);
  // TODO: try to make passed address as a Signer
  const signer = provider.getSigner();
  // TODO: import abi
  // const contract = new ethers.Contract(ContractAddresses.CERTIFICATE_NFT, abi, signer);
  const contract = { getCompleteCert: () => null };
  const completeCert = contract.getCompleteCert();

  // TODO: actually if can get cert from front-end hook then actually prefer front-end hook data, no need call blockchain waste money, dude already wasted money anyway

  // TODO: use node-canvas to draw cert
  // TODO: return image buffer of drawn cert
  const certificateBuffer = await generateCertificate(completeCert, exportType);
  res.setHeader("Content-Type", fileFormats[exportType]);
  res.send(certificateBuffer);
}
