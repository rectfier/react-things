import React from 'react';
import styles from './VendorOverviewCard.module.scss';

export interface VendorOverviewCardProps {
  vendorName: string;
  globalScore: number;
  summary: string;
  onViewProfile?: () => void;
}

const VendorOverviewCard: React.FC<VendorOverviewCardProps> = ({
  vendorName,
  globalScore,
  summary,
  onViewProfile
}) => {
  const scorePercentage = (globalScore / 10) * 100;

  return (
    <div className={styles.vendorCard}>
      <h2 className={styles.cardTitle}>Vendor Overview</h2>
      
      <div className={styles.vendorIcon}>
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="24" cy="24" r="24" fill="#E5E7EB" />
          <path
            d="M24 14C19.5817 14 16 17.5817 16 22C16 26.4183 19.5817 30 24 30C28.4183 30 32 26.4183 32 22C32 17.5817 28.4183 14 24 14ZM24 26C22.3431 26 21 24.6569 21 23C21 21.3431 22.3431 20 24 20C25.6569 20 27 21.3431 27 23C27 24.6569 25.6569 26 24 26Z"
            fill="#6B7280"
          />
          <path
            d="M18 31C16.8954 31 16 31.8954 16 33V35H32V33C32 31.8954 31.1046 31 30 31H18Z"
            fill="#6B7280"
          />
        </svg>
      </div>
      
      <h3 className={styles.vendorName}>{vendorName}</h3>
      
      <div className={styles.scoreSection}>
        <div className={styles.scoreHeader}>
          <span className={styles.scoreLabel}>Global Score:</span>
          <span className={styles.scoreValue}>{globalScore.toFixed(1)}</span>
        </div>
        <div className={styles.scoreBar}>
          <div 
            className={styles.scoreBarFill}
            style={{ width: `${scorePercentage}%` }}
          ></div>
        </div>
      </div>

      <div className={styles.summarySection}>
        <h4 className={styles.summaryTitle}>Summary</h4>
        <p className={styles.summaryText}>{summary}</p>
      </div>

      {onViewProfile && (
        <a className={styles.viewProfileLink} onClick={(e) => { e.preventDefault(); onViewProfile(); }}>
          View Profile
        </a>
      )}
    </div>
  );
};

export default VendorOverviewCard;

