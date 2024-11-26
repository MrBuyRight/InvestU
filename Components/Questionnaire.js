import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

function Questionnaire({ onComplete }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    full_name: '',
    phone_number: '',
    email: '',
    service_needed: '',
    other_service_description: '',
    currently_invested: null,
    investment_experience: '',
    current_investment_amount: '',
    primary_financial_goal: '',
    investment_timeline: '',
    risk_tolerance: '',
    annual_income: '',
    preferred_contact_method: '',
    best_contact_time: '',
    additional_notes: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const { data, error } = await supabase
        .from('client_profiles')
        .insert([formData])
        .select();

      if (error) throw error;
      onComplete(data[0]);
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('There was an error saving your information. Please try again.');
    }
  };

  const validateStep = (stepNumber) => {
    const newErrors = {};
    
    switch(stepNumber) {
      case 1:
        if (!formData.full_name.trim()) newErrors.full_name = 'Name is required';
        if (!formData.phone_number.trim()) newErrors.phone_number = 'Phone number is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
        break;
      case 2:
        if (!formData.service_needed) newErrors.service_needed = 'Please select a service';
        if (formData.service_needed === 'Other' && !formData.other_service_description.trim()) {
          newErrors.other_service_description = 'Please describe the service needed';
        }
        break;
      case 3:
        if (formData.currently_invested === null) newErrors.currently_invested = 'Please make a selection';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step < totalSteps) {
        setStep(step + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="question-card">
            <h2>Let's start with your basic information</h2>
            {renderInput('full_name', 'text', 'Full Name')}
            {renderInput('phone_number', 'tel', 'Phone Number')}
            {renderInput('email', 'email', 'Email Address')}
          </div>
        );

      case 2:
        return (
          <div className="question-card">
            <h2>How can we help you best?</h2>
            <select
              name="service_needed"
              value={formData.service_needed}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a Service</option>
              <option value="Investment Planning">Investment Planning</option>
              <option value="Retirement Planning">Retirement Planning</option>
              <option value="Tax Planning">Tax Planning</option>
              <option value="Estate Planning">Estate Planning</option>
              <option value="Debt Management">Debt Management</option>
              <option value="Business Planning">Business Planning</option>
              <option value="Other">Other</option>
            </select>
            {formData.service_needed === 'Other' && (
              <textarea
                name="other_service_description"
                placeholder="Please describe what you're looking for"
                value={formData.other_service_description}
                onChange={handleInputChange}
              />
            )}
          </div>
        );

      case 3:
        return (
          <div className="question-card">
            <h2>Tell us about your investment experience</h2>
            <div className="radio-group">
              <label>Are you currently invested?</label>
              <div>
                <input
                  type="radio"
                  name="currently_invested"
                  value="true"
                  checked={formData.currently_invested === true}
                  onChange={() => setFormData(prev => ({ ...prev, currently_invested: true }))}
                /> Yes
                <input
                  type="radio"
                  name="currently_invested"
                  value="false"
                  checked={formData.currently_invested === false}
                  onChange={() => setFormData(prev => ({ ...prev, currently_invested: false }))}
                /> No
              </div>
            </div>
          </div>
        );

      // Add more cases for additional steps...

      default:
        return null;
    }
  };

  const renderInput = (name, type, placeholder, required = true) => (
    <>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={formData[name]}
        onChange={handleInputChange}
        required={required}
        className={errors[name] ? 'invalid' : ''}
      />
      {errors[name] && <div className="error-message">{errors[name]}</div>}
    </>
  );

  const totalSteps = 3; // Update this as you add more steps

  return (
    <div className="questionnaire">
      <div className="progress-bar">
        Step {step} of {totalSteps}
      </div>
      
      <form onSubmit={(e) => {
        e.preventDefault();
        handleNext();
      }}>
        {renderStep()}
        
        <div className="navigation-buttons">
          {step > 1 && (
            <button type="button" onClick={() => setStep(step - 1)}>
              Previous
            </button>
          )}
          <button type="submit">
            {step === totalSteps ? 'Submit' : 'Next'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Questionnaire; 