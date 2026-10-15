# Security policy

First Edition is a static site. Reader pages run no server code. The optional
shared-editing service (`setup/worker/`) is the only component that handles
writes, and each school runs its own.

## Reporting a vulnerability

Use GitHub's private reporting: open the **Security** tab of this repository
and choose **Report a vulnerability**. The report is visible only to the
maintainer. You'll get a reply within 7 days.

Please don't open a public issue for security reports.

## Scope

- Anything in `site/` that could let a reader act as an editor without the
  host's login
- The shared-editing worker in `setup/worker/`
- The story-page generator in `setup/`
