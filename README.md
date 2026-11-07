# Rohith Halappa Chavan — Cybersecurity Portfolio

[Visit my portfolio](https://rohi2177.github.io/) · [View my CV](documents/rohith-halappa-chavan-cv.pdf)

## Master's dissertation: Implementing a Password Manager

**University of Sheffield · MSc Cybersecurity and Artificial Intelligence · 2026**

My dissertation explores how a Windows password manager can limit credential exposure after its vault has been unlocked. I designed and built a prototype with a separate vault broker and short-lived, single-use approvals scoped to an action and a record. The documented design includes Argon2id and AES-256-GCM.

- [Read the dissertation report (PDF)](documents/password-manager-dissertation.pdf)
- [Download the submitted project source and evidence (ZIP)](documents/password-manager-submission.zip)
- [Explore the project on my portfolio](https://rohi2177.github.io/#work)

The submitted evaluation recorded 305 passing automated tests and seven skipped. Five security properties were verified in a **simplified Tamarin model**. These are results reported in the dissertation; they do not establish that the entire application is secure. The report discusses the model's boundaries and residual risks, including exposure after a credential is copied or revealed.

I am continuing to work on the password manager project beyond the dissertation submission.

## About this repository

This repository hosts my portfolio and supporting documents using GitHub Pages. The dissertation ZIP contains the submitted source code, tests, documentation and evaluation evidence; it is an academic prototype rather than a packaged installer.
