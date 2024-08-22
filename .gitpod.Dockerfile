FROM gitpod/workspace-full

# Install any additional dependencies
RUN sudo apt-get update \
    && sudo apt-get install -y \
        curl \
        build-essential \
    && sudo apt-get clean