import { Octokit } from "@octokit/rest";
import { createAppAuth } from "@octokit/auth-app";
import fs from "fs";

// قراءة المفتاح الخاص من الملف
const privateKey = fs.readFileSync("/home/khalid/سطح المكتب/ema-project/emaprojectapp.2024-06-20.private-key.pem", "utf8");

const auth = createAppAuth({
  appId: 926492,
  privateKey: privateKey,
  clientId: "Iv23liVnJ8RnAiTYJNKX",
  clientSecret: "06b006362e3f9c6e71d498406c02415e6281aa79"
});

const installationOctokit = new Octokit({
  authStrategy: createAppAuth,
  auth: {
    appId: 926492,
    privateKey: privateKey,
    installationId: 52048197
  }
});

// جلب تفاصيل المستودع
installationOctokit.request('GET /repos/{owner}/{repo}', {
  owner: 'genral201',
  repo: 'ema-project'
}).then(response => {
  console.log(response.data);
}).catch(error => {
  console.error(error);
});

// جلب الفروع
installationOctokit.request('GET /repos/{owner}/{repo}/branches', {
  owner: 'genral201',
  repo: 'ema-project'
}).then(response => {
  console.log(response.data);
}).catch(error => {
  console.error(error);
});

// إنشاء مشكلة (Issue)
installationOctokit.request('POST /repos/{owner}/{repo}/issues', {
  owner: 'genral201',
  repo: 'ema-project',
  title: 'Issue Title',
  body: 'Issue body text here'
}).then(response => {
  console.log(response.data);
}).catch(error => {
  console.error(error);
});

// إنشاء طلب سحب (Pull Request)
installationOctokit.request('POST /repos/{owner}/{repo}/pulls', {
  owner: 'genral201',
  repo: 'ema-project',
  title: 'Pull Request Title',
  head: 'branch-name', // تأكد من أن هذا الفرع موجود
  base: 'main', // تأكد من أن هذا هو الفرع الأساسي
  body: 'Pull Request description here'
}).then(response => {
  console.log(response.data);
}).catch(error => {
  console.error(error);
});

