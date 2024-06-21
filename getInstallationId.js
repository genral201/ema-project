import { Octokit } from "@octokit/rest";
import { createAppAuth } from "@octokit/auth-app";
import fs from "fs";

// قراءة المفتاح الخاص من الملف
const privateKey = fs.readFileSync("/home/khalid/سطح المكتب/ema-project/emaprojectapp.2024-06-20.private-key.pem", "utf8");

const auth = createAppAuth({
  appId: 926492, // App ID الخاص بك
  privateKey: privateKey,
  clientId: "Iv23liVnJ8RnAiTYJNKX", // Client ID الخاص بك
  clientSecret: "06b006362e3f9c6e71d498406c02415e6281aa79" // Client Secret الخاص بك
});

const appOctokit = new Octokit({
  authStrategy: createAppAuth,
  auth: {
    appId: 926492,
    privateKey: privateKey
  }
});

// الحصول على معرف التثبيت
async function getInstallationId() {
  try {
    const installations = await appOctokit.request('GET /app/installations', {
      mediaType: {
        previews: ['machine-man']
      }
    });

    if (installations.data.length > 0) {
      const installationId = installations.data[0].id;
      console.log('Installation ID:', installationId);
    } else {
      console.error('No installations found. Make sure the app is installed on your repository.');
    }
  } catch (error) {
    console.error('Error fetching installations:', error);
  }
}

getInstallationId();
