# 使用官方的 Node.js 18.20.3 镜像作为基础镜像
FROM node:18.20.3

# 设置工作目录
WORKDIR /home/tool/default/url-shortener

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN pnpm install

# 复制项目文件
COPY . .

# 构建应用（如果使用 TypeScript）
RUN pnpm run build

# 暴露应用的端口
EXPOSE 3003

# 启动应用
CMD ["node", "dist/main"]