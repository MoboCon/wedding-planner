// MyWedding.jsx
import React, { useState } from 'react';
import GuestList from '../components/myWedding/GuestList';
import SeatPlanner from '../components/myWedding/SeatPlanner';
import BudgetTracker from '../components/myWedding/BudgetTracker';
import ToDoList from '../components/myWedding/ToDoList';
import CalendarSection from '../components/myWedding/CalendarSection';
import { FaUserFriends, FaChair, FaMoneyBillWave, FaListUl, FaCalendarAlt } from 'react-icons/fa';

function MyWedding() {
  const [activeTab, setActiveTab] = useState('guests');

  const renderContent = () => {
    switch (activeTab) {
      case 'guests':
        return <GuestList />;
      case 'seat':
        return <SeatPlanner />;
      case 'budget':
        return <BudgetTracker />;
      case 'todo':
        return <ToDoList />;
      case 'calendar':
        return <CalendarSection />;
      default:
        return <GuestList />;
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-pink-50">
      <h1 className="text-3xl font-serif text-pink-700 mb-6" data-aos="fade-down">
        Gestionarea Nunții Mele
      </h1>
      <div className="flex space-x-4 mb-6" data-aos="fade-right">
        <button
          onClick={() => setActiveTab('guests')}
          className={`flex items-center gap-2 px-4 py-2 rounded ${
            activeTab === 'guests' ? 'bg-pink-200 font-bold' : 'bg-white'
          }`}
        >
          <FaUserFriends /> Invitați
        </button>
        <button
          onClick={() => setActiveTab('seat')}
          className={`flex items-center gap-2 px-4 py-2 rounded ${
            activeTab === 'seat' ? 'bg-pink-200 font-bold' : 'bg-white'
          }`}
        >
          <FaChair /> Plan Mese
        </button>
        <button
          onClick={() => setActiveTab('budget')}
          className={`flex items-center gap-2 px-4 py-2 rounded ${
            activeTab === 'budget' ? 'bg-pink-200 font-bold' : 'bg-white'
          }`}
        >
          <FaMoneyBillWave /> Buget
        </button>
        <button
          onClick={() => setActiveTab('todo')}
          className={`flex items-center gap-2 px-4 py-2 rounded ${
            activeTab === 'todo' ? 'bg-pink-200 font-bold' : 'bg-white'
          }`}
        >
          <FaListUl /> Sarcini
        </button>
        <button
          onClick={() => setActiveTab('calendar')}
          className={`flex items-center gap-2 px-4 py-2 rounded ${
            activeTab === 'calendar' ? 'bg-pink-200 font-bold' : 'bg-white'
          }`}
        >
          <FaCalendarAlt /> Calendar
        </button>
      </div>
      <div className="bg-white shadow p-4 rounded" data-aos="zoom-in">
        {renderContent()}
      </div>
    </div>
  );
}

export default MyWedding;
