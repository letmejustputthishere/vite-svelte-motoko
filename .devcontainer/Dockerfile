FROM --platform=linux/amd64 rust:1.75-slim-bookworm

ENV NVM_DIR=/root/.nvm
ENV NVM_VERSION=v0.39.7
ENV NODE_VERSION=21.5.0
ENV DFX_VERSION=0.16.0

RUN apt -yq update
RUN apt -yqq install --no-install-recommends curl ca-certificates libunwind-dev git 

# Install Node.js using nvm
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin:${PATH}"
RUN curl --fail -sSf https://raw.githubusercontent.com/creationix/nvm/${NVM_VERSION}/install.sh | bash
RUN . "${NVM_DIR}/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "${NVM_DIR}/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "${NVM_DIR}/nvm.sh" && nvm alias default v${NODE_VERSION}

# Install dfx
RUN sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"

# Install mops
RUN npm i -g ic-mops@latest
RUN mops toolchain init
