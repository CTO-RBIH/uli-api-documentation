import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useVersions, useLatestVersion} from '@docusaurus/plugin-content-docs/client';

function Version() {
  const {siteConfig} = useDocusaurusContext();
  const versions = useVersions();
  const latestVersion = useLatestVersion();
  const currentVersion = versions.find((version) => version.name === 'current');
  const pastVersions = versions.filter(
    (version) => version !== latestVersion && version.name !== 'current',
  );

  return (
    <Layout
      title="Versions"
      description="RBIH Docs Versions page listing all documented versions">
      <main className="container margin-vert--lg">
        <h1>RBIH Documentation Versions</h1>

        {currentVersion && (
          <div className="margin-bottom--lg">
            <h3 id="next">Current version (Unreleased)</h3>
            <p>Here you can find the documentation for work-in-progress unreleased version.</p>
            <table>
              <tbody>
                <tr>
                  <th>{currentVersion.label}</th>
                  <td>
                    <Link to={currentVersion.path}>Documentation</Link>
                  </td>
                  <td>
                    <Link to={`${currentVersion.path}/petstore/swagger-petstore-yaml`}>API Reference</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {latestVersion && (
          <div className="margin-bottom--lg">
            <h3 id="latest">Latest stable version</h3>
            <p>Here you can find the documentation for the latest stable version.</p>
            <table>
              <tbody>
                <tr>
                  <th>{latestVersion.label}</th>
                  <td>
                    <Link to={latestVersion.path}>Documentation</Link>
                  </td>
                  <td>
                    <Link to={`${latestVersion.path}/petstore/swagger-petstore-yaml`}>API Reference</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {pastVersions.length > 0 && (
          <div className="margin-bottom--lg">
            <h3 id="archive">Past versions</h3>
            <p>Here you can find documentation for previous versions.</p>
            <table>
              <tbody>
                {pastVersions.map((version) => (
                  <tr key={version.name}>
                    <th>{version.label}</th>
                    <td>
                      <Link to={version.path}>Documentation</Link>
                    </td>
                    <td>
                      <Link to={`${version.path}/petstore/swagger-petstore-yaml`}>API Reference</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </Layout>
  );
}

export default Version;