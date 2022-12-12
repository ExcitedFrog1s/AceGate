import React, { useState } from 'react';
import {Select } from 'antd';
const optionValue = ['人工智能', '机器学习', '计算机网络',
'神经网络', '深度学习', '植物泛基因研究',
'生态与环境科学', '地球科学', '马克思主义', 
'生物科学领域', '电磁波吸收材料', '化学与材料科学',
'物理学', '人文社科', '天文学与天体物理学',
'数学'];
const options = [];
for (let i = 10; i < 26; i++) {
  options.push({
    value: i.toString(36) + i,
    label: optionValue[i-10]
  });
}
const handleChange = (value) => {
  console.log(`Selected: ${value}`);
};
const Option = () => {
  const [size] = useState('middle');
  return (
    <>
      <Select
        mode="tags"
        size={size}
        placeholder="Please select"
        defaultValue={['a10', 'c12']}
        onChange={handleChange}
        style={{
          width: '100%',
        }}
        options={options}
      />
    </>
  );
};
export default Option;