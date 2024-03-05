import './index.css';
import Page from "../../component/page";
import BackButton from "../../component/back-button";
import TitleMedium from '../../component/title-medium';
import Notification from "../../component/notification";


import { useState, useEffect } from 'react';
import { useParams  } from 'react-router-dom';

//====================================================

export default function Component () {
    const [notifications, setNotifications] = useState(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch(`http://localhost:4000/notifications`);
                if (response.ok) {
                    const data = await response.json();
                    setNotifications(data);
                } else {
                    console.error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchNotifications();
    }, []);

    let notes;
    let time;

    if (notifications !== null) {
        notes = notifications.notifications;
    }

    if (notifications === null || (notes === null)) {
        return (
            <Page>
                <BackButton />
                <TitleMedium name="Notifications" />
                <div className='loading'>Loading...</div>
            </Page>
        );
    }

    const renderNotifications = () => {
        return notifications.notifications.map((notific) => (
            <Notification
                key={notific.id}
                name={notific.name}
                type={notific.type}
                id={notific.id}
                time={calculateTimeAgo(notific.time)}
            />
        ));
    };

    const calculateTimeAgo = (time) => {
        const currentTime = new Date();
        const notificationTime = new Date(time);
        const timeDifference = currentTime - notificationTime;
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}:${minutes} ago`;
    };

    return (
        <Page>
            <BackButton />
            <TitleMedium name="Notifications" />
                <section className='section__notific'>
                {renderNotifications()}
                </section>                   
            
        </Page>
    );
};