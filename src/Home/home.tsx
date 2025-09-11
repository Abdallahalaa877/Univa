import styles from "./home.module.css";

export default function Events() {
  return (
    <div className={styles.page}>
      {/* Banner */}
      <div className={styles.banner}>
        <div>
          <h2>Join our Event with Career Fair 2024</h2>
        </div>
        <button className={styles.bannerBtn}>Join Now</button>
      </div>

      {/* Search */}
      <div className={styles.searchBox}>
        <input type="text" placeholder="Search" />
      </div>

      {/* Filters
      <div className={styles.filters}>
        <button className={`${styles.filterBtn} ${styles.active}`}>All</button>
        <button className={styles.filterBtn}>Announcements</button>
        <button className={styles.filterBtn}>Events</button>
        <button className={styles.filterBtn}>Deadlines</button>
        <button className={styles.filterBtn}>Resources</button>
      </div> */}

      {/* Cards */}
      <div className={styles.card}>
        {/* مكان الصورة فاضي */}
        <div className={styles.imagePlaceholder}></div>
        <div className={styles.cardBody}>
          <h3>Career Fair 2024</h3>
          <p>
            Connect with top employers at the annual Career Fair. Bring your
            resume and dress professionally. Companies from various industries
            will be present, offering internships and full-time positions.
          </p>
        </div>
        <span className={styles.badgeEvent}>Event</span>
      </div>

      <div className={styles.card}>
        <div className={styles.imagePlaceholder}></div>
        <div className={styles.cardBody}>
          <h3>Campus-Wide Safety Drill</h3>
          <p>
            A mandatory safety drill will be conducted on campus to ensure
            preparedness for emergencies. All students, faculty, and staff are
            required to participate.
          </p>
        </div>
        <span className={styles.badgeAnnouncement}>Announcement</span>
      </div>
    </div>
  );
}
