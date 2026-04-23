import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateField } from '../store/interactionSlice';

const LogInteractionForm = () => {
  const form = useSelector((state) => state.interaction);
  const dispatch = useDispatch();

  const handleChange = (field, value) => {
    dispatch(updateField({ field, value }));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-blue-900">Structured Interaction Log</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">HCP Name</label>
          <input 
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={form.hcpName}
            onChange={(e) => handleChange('hcpName', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Interaction Type</label>
          <select 
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={form.type}
            onChange={(e) => handleChange('type', e.target.value)}
          >
            <option value="F2F">Face to Face</option>
            <option value="Virtual">Virtual Meeting</option>
            <option value="Email">Email Communication</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Clinical Summary</label>
          <textarea 
            rows="4"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={form.summary}
            onChange={(e) => handleChange('summary', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Follow-up Date</label>
          <input 
            type="date"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={form.followUpDate}
            onChange={(e) => handleChange('followUpDate', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default LogInteractionForm;