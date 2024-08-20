"use client";
import { useRouter } from 'next/navigation';

export default function LandingPage() {
    const router = useRouter();

    const handleDashboard = () => {
        router.push('/dashboard');
    }

    return (
        //a basic landing page that allows users to move onto the dashboard (add login functionality is on list of things to do)
        <div style={{ textAlign: 'center', padding: '50px' }}>
        <h1>Welcome to DashboardNow</h1>
        <p>An AI development challenge developed by Hirav Thakur. Click the button below to enter the dashboard.</p>
        <button 
            onClick={handleDashboard}
            style={{ 
                padding: '10px 20px', 
                fontSize: '16px', 
                backgroundColor: '#007bff', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer' 
            }}
        >
            Enter Dashboard
        </button>
    </div>
    );
}