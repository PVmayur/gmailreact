import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios'; // Import axios
import './MyDiverseForm.css'; // Import your CSS file

const MyDiverseForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('gender', data.gender);
    formData.append('plan', data.plan);
    formData.append('terms', data.terms);
    formData.append('profilePic', data.profilePic[0]); // Append the file

    // Send the formData to the server
    axios.post('http://localhost:5000/api/submit', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      console.log(response.data);
      alert('Data submitted successfully!'); // Optional: Alert the user
    })
    .catch(error => {
      console.error('Error submitting data:', error);
      alert('An error occurred while submitting data.'); // Optional: Alert the user
    });
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Jewelry Order Form</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        {/* Name Input */}
        <div className="form-group">
          <label className="form-label">Name</label>
          <input className="form-input" {...register('name', { required: true })} />
          {errors.name && <p className="error-message">Name is required</p>}
        </div>

        {/* Email Input */}
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-input"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>

        {/* Gender Select */}
        <div className="form-group">
          <label className="form-label">Gender</label>
          <select className="form-select" {...register('gender', { required: true })}>
            <option value="">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p className="error-message">Gender is required</p>}
        </div>

        {/* Subscription Plan Radio Buttons */}
        <div className="form-group">
          <label className="form-label">Subscription Plan</label>
          <div>
            <input type="radio" value="basic" {...register('plan')} />
            <label className="radio-label">Basic</label>
          </div>
          <div>
            <input type="radio" value="premium" {...register('plan')} />
            <label className="radio-label">Premium</label>
          </div>
        </div>

        {/* Terms Checkbox */}
        <div className="form-group">
          <input type="checkbox" {...register('terms', { required: true })} />
          <label className="terms-label">I agree to the terms and conditions</label>
          {errors.terms && <p className="error-message">You must agree to the terms</p>}
        </div>

        {/* File Upload */}
        <div className="form-group">
          <label className="form-label">Upload Profile Picture</label>
          <input type="file" className="form-input" {...register('profilePic', { required: true })} />
          {errors.profilePic && <p className="error-message">Profile picture is required</p>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default MyDiverseForm;
