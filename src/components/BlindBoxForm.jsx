// src/components/Admin/BlindBoxForm.jsx
import React, { useState, useRef, useEffect } from 'react';
import { FaPlus, FaTrash, FaSave, FaTimes, FaUpload } from 'react-icons/fa';

const BlindBoxForm = ({ 
  initialData, 
  onSubmit, 
  onCancel 
}) => {
  // 初始化表单数据
  const [formData, setFormData] = useState({
    name: '',
    probabilities: [{ item: '', chance: 0.1, image: '' }]
  });
  
  // 错误状态
  const [errors, setErrors] = useState({});
  // 表单提交状态
  const [isSubmitting, setIsSubmitting] = useState(false);
  // 文件输入引用
  const fileInputRefs = useRef([]);
  
  // 当传入初始数据时，更新表单状态
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      // 初始化文件输入引用数组
      fileInputRefs.current = new Array(initialData.probabilities.length).fill(null);
    } else {
      fileInputRefs.current = [null];
    }
  }, [initialData]);
  
  // 处理盲盒名称变更
  const handleNameChange = (e) => {
    setFormData(prev => ({
      ...prev,
      name: e.target.value
    }));
  };
  
  // 处理概率项变更
  const handleProbabilityChange = (index, field, value) => {
    const newProbabilities = [...formData.probabilities];
    
    if (field === 'chance') {
      newProbabilities[index][field] = parseFloat(value) || 0;
    } else {
      newProbabilities[index][field] = value;
    }
    
    setFormData(prev => ({
      ...prev,
      probabilities: newProbabilities
    }));
  };
  
  // 添加新的概率项
  const addProbability = () => {
    setFormData(prev => ({
      ...prev,
      probabilities: [...prev.probabilities, { item: '', chance: 0.1, image: '' }]
    }));
    
    // 添加一个新的文件输入引用
    fileInputRefs.current.push(null);
  };
  
  // 删除概率项
  const removeProbability = (index) => {
    if (formData.probabilities.length <= 1) return;
    
    const newProbabilities = [...formData.probabilities];
    newProbabilities.splice(index, 1);
    
    setFormData(prev => ({
      ...prev,
      probabilities: newProbabilities
    }));
    
    // 移除对应的文件输入引用
    fileInputRefs.current.splice(index, 1);
  };
  
  // 处理图片上传
  const handleImageUpload = (index, e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (event) => {
      if (!event.target?.result) return;
      
      const newProbabilities = [...formData.probabilities];
      newProbabilities[index].image = event.target.result;
      
      setFormData(prev => ({
        ...prev,
        probabilities: newProbabilities
      }));
    };
    
    reader.readAsDataURL(file);
  };
  
  // 触发文件输入点击
  const triggerFileInput = (index) => {
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index].click();
    }
  };
  
  // 验证表单
  const validateForm = () => {
    const newErrors = {};
    
    // 盲盒名称验证
    if (!formData.name.trim()) newErrors.name = '请输入盲盒名称';
    
    // 概率项验证
    let totalChance = 0;
    formData.probabilities.forEach((prob, index) => {
      if (!prob.item.trim()) {
        newErrors[`probItem${index}`] = '请输入奖品名称';
      }
      
      if (prob.chance <= 0) {
        newErrors[`probChance${index}`] = '概率必须大于0';
      }
      
      if (!prob.image) {
        newErrors[`probImage${index}`] = '请上传奖品图片';
      }
      
      totalChance += prob.chance;
    });
    
    // 总概率验证
    if (Math.abs(totalChance - 1) > 0.0001) {
      newErrors.totalChance = `概率总和必须为1 (当前: ${totalChance.toFixed(2)})`;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // 处理表单提交
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      onSubmit(formData);
    } catch (error) {
      console.error('提交失败:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // 计算总概率
  const totalChance = formData.probabilities.reduce((sum, prob) => sum + prob.chance, 0);
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {initialData ? '编辑盲盒' : '添加新盲盒'}
        </h2>
        <button 
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700 transition"
        >
          <FaTimes size={20} />
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 盲盒名称 */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            盲盒名称 *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleNameChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="例如：神秘海洋盲盒"
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>
        
        {/* 概率设置部分 */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">奖品设置 *</h3>
            <button
              type="button"
              onClick={addProbability}
              className="flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition"
            >
              <FaPlus size={12} /> 添加奖品
            </button>
          </div>
          
          {errors.totalChance && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
              <p className="font-medium">{errors.totalChance}</p>
            </div>
          )}
          
          <div className="space-y-8">
            {formData.probabilities.map((prob, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-[150px_1fr_120px_40px] gap-4 items-start">
                {/* 奖品图片上传 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    奖品图片
                  </label>
                  <div className="relative">
                    <div 
                      className={`w-32 h-32 rounded-lg border-2 border-dashed flex items-center justify-center cursor-pointer overflow-hidden ${
                        errors[`probImage${index}`] ? 'border-red-500' : 'border-gray-300'
                      }`}
                      onClick={() => triggerFileInput(index)}
                    >
                      {prob.image ? (
                        <img 
                          src={prob.image} 
                          alt={`奖品 ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-gray-400 text-center p-2">
                          <FaUpload className="mx-auto mb-1" />
                          <span className="text-xs">点击上传</span>
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      ref={el => fileInputRefs.current[index] = el}
                      onChange={(e) => handleImageUpload(index, e)}
                      accept="image/*"
                      className="hidden"
                    />
                    {errors[`probImage${index}`] && (
                      <p className="mt-1 text-xs text-red-500">{errors[`probImage${index}`]}</p>
                    )}
                  </div>
                </div>
                
                {/* 奖品名称 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    奖品名称
                  </label>
                  <input
                    type="text"
                    value={prob.item}
                    onChange={(e) => handleProbabilityChange(index, 'item', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      errors[`probItem${index}`] ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder={`奖品 #${index + 1}`}
                  />
                  {errors[`probItem${index}`] && (
                    <p className="mt-1 text-sm text-red-500">{errors[`probItem${index}`]}</p>
                  )}
                </div>
                
                {/* 概率设置 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    概率 (0-1)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="1"
                    step="0.01"
                    value={prob.chance}
                    onChange={(e) => handleProbabilityChange(index, 'chance', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      errors[`probChance${index}`] ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors[`probChance${index}`] && (
                    <p className="mt-1 text-sm text-red-500">{errors[`probChance${index}`]}</p>
                  )}
                </div>
                
                {/* 删除按钮 */}
                <div className="flex items-end h-[42px]">
                  <button
                    type="button"
                    onClick={() => removeProbability(index)}
                    disabled={formData.probabilities.length <= 1}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                      formData.probabilities.length <= 1 
                        ? 'text-gray-300 cursor-not-allowed' 
                        : 'text-red-500 hover:bg-red-50'
                    }`}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* 总概率显示 */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 font-medium">总概率:</span>
              <span className={`text-lg font-bold ${
                Math.abs(totalChance - 1) < 0.0001 
                  ? 'text-green-600' 
                  : 'text-red-600'
              }`}>
                {totalChance.toFixed(4)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full" 
                style={{ width: `${Math.min(totalChance * 100, 100)}%` }}
              ></div>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              提示：所有奖品的概率总和必须恰好为1
            </div>
          </div>
        </div>
        
        {/* 表单操作按钮 */}
        <div className="flex justify-end gap-3 pt-6">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition"
          >
            取消
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 transition flex items-center gap-2"
          >
            <FaSave /> {isSubmitting ? '保存中...' : '保存盲盒'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlindBoxForm;