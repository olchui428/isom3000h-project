// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  ContractAddresses,
  certificateEndpointABI,
  networkConfig,
} from "@/blockchain/contracts.config";
import { CertificateFormats } from "@/types";
import { ethers } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";
import { generateCertificate } from "@/utils/generateCertificate";
import { CompleteCertStructOutput } from "@/types/typechain-types/contracts/endpoints/CertificateEndpoint";

const fileFormats = {
  // PDF: "application/pdf",
  JPG: "image/jpeg",
  PNG: "image/png",
};

/**
 * This API uses node-canvas to return a rendered image of a certificate
 *
 * Required body data:
 * - exportType
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Parse API input
  const { certificateId: certIdStr } = req.query as { certificateId: string };
  const certificateId = parseInt(certIdStr);
  const exportType: CertificateFormats = req.body?.exportType;
  if (fileFormats[exportType] === undefined) {
    return res.status(400).send("Invalid value for input parameter exportType.");
  }

  // Initialize Contract variables
  const { rpc } = networkConfig;
  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const contract = new ethers.Contract(
    ContractAddresses.CERTIFICATE_ENDPOINT,
    certificateEndpointABI,
    provider
  );

  try {
    // Get Certificate data
    const completeCert: CompleteCertStructOutput = await contract.getCompleteCertById(
      certificateId
    );

    // Generate Certificate image
    const certificateBuffer = await generateCertificate(completeCert, exportType);

    res.setHeader("Content-Type", fileFormats[exportType]);
    return res.send(certificateBuffer);
  } catch (error) {
    console.log("Error with getCompleteCertById():", error);
    res.status(404).send("Unable to obtain certificate data.");
  }
}
