import { Component, type ErrorInfo, type ReactNode } from 'react';
import { profile } from '../data/content';

interface Props { readonly children: ReactNode }
interface State { readonly failed: boolean }

/**
 * A portfolio that white-screens is worse than one that looks plain.
 * If anything throws, fall back to the details a recruiter actually needs.
 */
export class ErrorBoundary extends Component<Props, State> {
  override state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Render failed:', error, info.componentStack);
  }

  override render(): ReactNode {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="fallback">
        <h1>{profile.name}</h1>
        <p>{profile.role}</p>
        <p>
          Something went wrong rendering this page. My details are below and
          the resume link still works.
        </p>
        <p>
          <a href={`mailto:${profile.email}`}>{profile.email}</a><br />
          <a href={profile.resume}>Download resume</a><br />
          <a href={profile.github}>GitHub</a> · <a href={profile.linkedin}>LinkedIn</a>
        </p>
      </div>
    );
  }
}

export default ErrorBoundary;
