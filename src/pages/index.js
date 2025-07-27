import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.hero}>
      <div className={styles.heroBanner}>
        <img 
          src="/img/hero/innovation-banner.png" 
          alt="RBIH Innovation - AI, Technology, and Rural Development"
          className={styles.heroImage}
        />
      </div>
      <div className="container">
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            {siteConfig.title}
          </h1>
          <p className={styles.heroSubtitle}>
            {siteConfig.tagline}
          </p>
          <div className={styles.heroButtons}>
            <Link
              className={clsx('button button--primary button--lg', styles.heroButton)}
              to="/docs/next/rbih-apis">
              Get Started
            </Link>
            <Link
              className={clsx('button button--secondary button--lg', styles.heroButton)}
              to="/docs/next/rbih-apis">
              API Reference
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function Feature({title, description, icon}) {
  return (
    <div className={clsx('col col--4', styles.feature)}>
      <div className={styles.featureIcon}>{icon}</div>
      <div className={styles.featureContent}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

function HomepageFeatures() {
  const features = [
    {
      title: 'RESTful API',
      icon: '🔌',
      description: 'Well-designed RESTful API endpoints with comprehensive documentation and examples.',
    },
    {
      title: 'OpenAPI Spec',
      icon: '📚',
      description: 'Complete OpenAPI 3.0 specification with interactive API explorer and code generation.',
    },
    {
      title: 'Developer Friendly',
      icon: '🚀',
      description: 'Built with developers in mind. Clear documentation, examples, and SDKs for multiple languages.',
    },
  ];

  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {features.map((feature, idx) => (
            <Feature key={idx} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - ${siteConfig.tagline}`}
      description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}