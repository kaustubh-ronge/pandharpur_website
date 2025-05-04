import Link from 'next/link';

const QuickAccess = () => {
  return (
    <section className="quick-access">
      <h2>Quick Access</h2>
      <div className="quick-access-options">
        <div className="option">
          <Link href="/reportperson">
            <a>Report Missing Person</a>
          </Link>
        </div>
        <div className="option">
          <Link href="/emergency-contacts">
            <a>Emergency Contacts</a>
          </Link>
        </div>
        <div className="option">
          <Link href="/help-centers">
            <a>Help Centers</a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default QuickAccess;
