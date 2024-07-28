import crypto from "crypto";

export default function generateToken() {
  return crypto.randomBytes(64).toString("hex");
}
