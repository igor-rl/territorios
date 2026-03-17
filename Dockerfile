FROM node:22-bookworm-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    curl \
    wget \
    file \
    git \
    build-essential \
    pkg-config \
    libssl-dev \
    libgtk-3-dev \
    libwebkit2gtk-4.1-dev \
    librsvg2-dev \
    libayatana-appindicator3-dev \
    ca-certificates \
    xdg-utils \
    && rm -rf /var/lib/apt/lists/*

RUN curl https://sh.rustup.rs -sSf | sh -s -- -y

ENV PATH="/root/.cargo/bin:${PATH}"

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["tail", "-f", "/dev/null"]