import React, { useState } from 'react';
import { Crop } from '../types';
import { Plus, Leaf, Calendar, Info } from 'lucide-react';

const INITIAL_CROPS: Crop[] = [
  {
    id: '1',
    name: 'Corn',
    variety: 'Golden Harvest',
    plantedDate: '2023-04-15',
    expectedHarvest: '2023-09-20',
    status: 'Healthy',
    area: 120,
    imageUrl: 'https://picsum.photos/seed/corn/400/300'
  },
  {
    id: '2',
    name: 'Soybeans',
    variety: 'Pioneer 45T',
    plantedDate: '2023-05-10',
    expectedHarvest: '2023-10-05',
    status: 'Needs Attention',
    area: 85,
    imageUrl: 'https://picsum.photos/seed/soybean/400/300'
  },
  {
    id: '3',
    name: 'Wheat',
    variety: 'Winter Red',
    plantedDate: '2022-10-01',
    expectedHarvest: '2023-07-15',
    status: 'Ready for Harvest',
    area: 200,
    imageUrl: 'https://picsum.photos/seed/wheat/400/300'
  }
];

const Crops: React.FC = () => {
  const [crops] = useState<Crop[]>(INITIAL_CROPS);

  const getStatusColor = (status: Crop['status']) => {
    switch (status) {
      case 'Healthy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Needs Attention': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Ready for Harvest': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h1 className="text-3xl font-bold text-gray-900">My Crops</h1>
           <p className="text-gray-600">Manage and track your field performance.</p>
        </div>
        <button className="flex items-center space-x-2 bg-agri-600 hover:bg-agri-700 text-white px-4 py-2 rounded-lg transition-all shadow-sm">
          <Plus size={20} />
          <span>Add New Crop</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {crops.map((crop) => (
          <div key={crop.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={crop.imageUrl} 
                alt={crop.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border shadow-sm ${getStatusColor(crop.status)}`}>
                  {crop.status}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                   <h2 className="text-xl font-bold text-gray-900">{crop.name}</h2>
                   <p className="text-sm text-gray-500">{crop.variety}</p>
                </div>
                <div className="flex items-center space-x-1 text-gray-600 bg-gray-50 px-2 py-1 rounded">
                   <Leaf size={14} />
                   <span className="text-xs font-medium">{crop.area} ac</span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar size={16} className="mr-2 text-agri-500" />
                  <span>Planted: {crop.plantedDate}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Info size={16} className="mr-2 text-blue-500" />
                  <span>Harvest: {crop.expectedHarvest}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between">
                <button className="text-agri-600 text-sm font-semibold hover:text-agri-700">View Details</button>
                <button className="text-gray-400 hover:text-gray-600 text-sm">Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Crops;
