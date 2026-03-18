// BMI 计算函数
function calculateBMI() {
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);

    if (!height || !weight || height <= 0 || weight <= 0) {
        alert('请输入有效的身高和体重！');
        return;
    }

    // BMI = 体重 / 身高^2
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    const bmiRounded = bmi.toFixed(1);

    // 显示结果
    document.getElementById('bmi-value').textContent = bmiRounded;
    
    // 设置状态
    const statusElement = document.getElementById('bmi-status');
    let status, className;
    
    if (bmi < 18.5) {
        status = '体重偏轻';
        className = 'status-underweight';
    } else if (bmi < 24) {
        status = '体重正常';
        className = 'status-normal';
    } else if (bmi < 28) {
        status = '体重偏重';
        className = 'status-overweight';
    } else {
        status = '体重肥胖';
        className = 'status-obese';
    }

    statusElement.textContent = status;
    statusElement.className = 'result-status ' + className;

    // 设置刻度指示器位置
    const indicator = document.getElementById('bmi-indicator');
    // BMI范围 15-35 映射到 0-100%
    let position = ((bmi - 15) / 20) * 100;
    position = Math.max(0, Math.min(100, position));
    indicator.style.left = position + '%';

    // 显示结果框
    document.getElementById('bmi-result').classList.remove('hidden');
}

// 体脂率计算函数 (使用美国海军体脂计算公式)
function calculateBodyFat() {
    const gender = document.getElementById('gender').value;
    const age = parseFloat(document.getElementById('age').value);
    const waist = parseFloat(document.getElementById('waist').value);
    const neck = parseFloat(document.getElementById('neck').value);
    const hip = parseFloat(document.getElementById('hip').value);

    // 验证输入
    if (!age || !waist || !neck || age <= 0 || waist <= 0 || neck <= 0) {
        alert('请填写所有必填项！');
        return;
    }

    if (gender === 'female' && !hip) {
        alert('女性用户请输入臀围！');
        return;
    }

    let bodyFat;

    if (gender === 'male') {
        // 男性体脂率计算公式
        bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
        // 由于需要身高，我们使用更简单的公式
        const height = parseFloat(document.getElementById('height').value);
        if (!height) {
            alert('请先在BMI计算器中输入身高！');
            return;
        }
        bodyFat = 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
    } else {
        // 女性体脂率计算公式
        const height = parseFloat(document.getElementById('height').value);
        if (!height) {
            alert('请先在BMI计算器中输入身高！');
            return;
        }
        bodyFat = 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387;
    }

    bodyFat = Math.max(3, Math.min(50, bodyFat)); // 限制在合理范围
    const bodyFatRounded = bodyFat.toFixed(1);

    // 显示结果
    document.getElementById('fat-value').textContent = bodyFatRounded + '%';

    // 设置状态和分类
    const statusElement = document.getElementById('fat-status');
    const categoryElement = document.getElementById('fat-category');
    const rangeElement = document.getElementById('fat-range');

    let status, className, category, range;

    if (gender === 'male') {
        if (bodyFat < 6) {
            status = '体脂过低';
            className = 'status-underweight';
            category = '必需脂肪';
        } else if (bodyFat < 14) {
            status = '体脂偏低';
            className = 'status-underweight';
            category = '运动员水平';
        } else if (bodyFat < 18) {
            status = '体脂正常';
            className = 'status-normal';
            category = '健康水平';
        } else if (bodyFat < 25) {
            status = '体脂偏高';
            className = 'status-overweight';
            category = '可接受水平';
        } else {
            status = '体脂过高';
            className = 'status-obese';
            category = '肥胖';
        }
        range = '6-24%';
    } else {
        if (bodyFat < 14) {
            status = '体脂过低';
            className = 'status-underweight';
            category = '必需脂肪';
        } else if (bodyFat < 21) {
            status = '体脂偏低';
            className = 'status-underweight';
            category = '运动员水平';
        } else if (bodyFat < 25) {
            status = '体脂正常';
            className = 'status-normal';
            category = '健康水平';
        } else if (bodyFat < 32) {
            status = '体脂偏高';
            className = 'status-overweight';
            category = '可接受水平';
        } else {
            status = '体脂过高';
            className = 'status-obese';
            category = '肥胖';
        }
        range = '14-31%';
    }

    statusElement.textContent = status;
    statusElement.className = 'result-status ' + className;
    categoryElement.textContent = category;
    rangeElement.textContent = range;

    // 显示结果框
    document.getElementById('fat-result').classList.remove('hidden');
}

// 性别选择联动
document.getElementById('gender').addEventListener('change', function() {
    const hipGroup = document.getElementById('hip-group');
    const hipInput = document.getElementById('hip');
    
    if (this.value === 'female') {
        hipGroup.style.display = 'block';
        hipInput.required = true;
    } else {
        hipGroup.style.display = 'none';
        hipInput.required = false;
    }
});

// 初始化隐藏臀围输入（默认男性）
document.getElementById('hip-group').style.display = 'none';
