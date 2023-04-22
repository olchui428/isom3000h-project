// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ContractAddresses, networkConfig } from "@/blockchain/contracts.config";
import type { NextApiRequest, NextApiResponse } from "next";

// const adminAccountPrivateKey: string = process.env.ADMIN_PK;
networkConfig
ContractAddresses

/**
 * This API uses node-canvas to return a rendered image of a certificate
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { certificateId: certIdStr } = req.query;
  const certificateId = parseInt(certIdStr!);

  const { rpc } = networkConfig;
  ContractAddresses.CERTIFICATE_NFT;
  // ethers.providers.getJsonRpc something something

  // get data from cert contract

  // TODO: use node-canvas to draw cert
  // TODO: return image buffer of drawn cert
  const imageBuffer = 0;
  res.setHeader("Content-Type", "image/png");
  res.send(imageBuffer);
}
