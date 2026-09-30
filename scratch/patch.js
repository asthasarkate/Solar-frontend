const fs = require('fs');
const path = require('path');

// 1. Update Prediction.js
const predModelPath = 'd:\\backend\\src\\models\\Prediction.js';
let predModel = fs.readFileSync(predModelPath, 'utf8');
if (!predModel.includes('recommendedProfessional')) {
    predModel = predModel.replace(
        /recommendation:\s*\{\s*type:\s*String,\s*required:\s*true,\s*\},/g,
        `recommendation: {\n      type: String,\n      required: true,\n    },\n    recommendedProfessional: {\n      type: String,\n      required: true,\n    },`
    );
    fs.writeFileSync(predModelPath, predModel);
    console.log('Updated Prediction.js');
}

// 2. Update predictionController.js
const predCtrlPath = 'd:\\backend\\src\\controllers\\predictionController.js';
let predCtrl = fs.readFileSync(predCtrlPath, 'utf8');
if (!predCtrl.includes('recommendedProfessional: result.recommendedProfessional')) {
    predCtrl = predCtrl.replace(
        /recommendation:\s*result\.recommendation,/g,
        `recommendation: result.recommendation,\n      recommendedProfessional: result.recommendedProfessional,`
    );
    predCtrl = predCtrl.replace(
        /recommendation:\s*prediction\.recommendation,/g,
        `recommendation: prediction.recommendation,\n      recommendedProfessional: prediction.recommendedProfessional,`
    );
    fs.writeFileSync(predCtrlPath, predCtrl);
    console.log('Updated predictionController.js');
}

// 3. Update aiService.js
const aiSvcPath = 'd:\\backend\\src\\services\\aiService.js';
let aiSvc = fs.readFileSync(aiSvcPath, 'utf8');
if (!aiSvc.includes('const PROFS =')) {
    const mockLogic = `
const PROFS = {
  Dust: 'Professional Panel Cleaning Service',
  Cracks: 'Certified Solar Panel Technician',
  'Physical Damage': 'Solar Installation Technician',
  Shading: 'Site Maintenance Team'
};

const getMockPrediction = () => {
  const faultType = FAULT_TYPES[Math.floor(Math.random() * FAULT_TYPES.length)];
  const severity = SEVERITIES[Math.floor(Math.random() * SEVERITIES.length)];
  const confidence = Math.floor(Math.random() * 24) + 75;
  const recommendation = RECOMMENDATIONS[faultType][severity];
  const recommendedProfessional = PROFS[faultType];
  return { faultType, severity, confidence, recommendation, recommendedProfessional };
};`;

    aiSvc = aiSvc.replace(
        /const getMockPrediction = \(\) => \{[\s\S]*?return \{ faultType, severity, confidence, recommendation \};\n\};/m,
        mockLogic.trim()
    );

    aiSvc = aiSvc.replace(
        /const \{ faultType, severity, confidence, recommendation \} = response\.data;/g,
        `const { faultType, severity, confidence, recommendation, recommendedProfessional } = response.data;`
    );
    aiSvc = aiSvc.replace(
        /return \{ faultType, severity, confidence, recommendation \};/g,
        `return { faultType, severity, confidence, recommendation, recommendedProfessional };`
    );

    fs.writeFileSync(aiSvcPath, aiSvc);
    console.log('Updated aiService.js');
}
