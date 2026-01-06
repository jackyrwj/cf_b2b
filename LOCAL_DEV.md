# 本地开发指南

## 当前环境配置

由于网络问题，你只能使用**本地开发模式**。

## 开发模式说明

### 1. 本地开发模式 (`npm run dev:local`)

**特点：**
- ✅ 快速重启，适合前端开发
- ✅ 无需网络连接
- ⚠️  使用本地 D1 数据库（需要手动初始化）
- ⚠️  使用本地 R2（空，图片不显示）
- ⚠️  使用本地 KV（空，使用默认设置）

**使用方法：**

```bash
# 启动本地开发服务器
npm run dev:local

# 服务器会运行在 http://localhost:8788 (或 8787)
```

**初始化本地数据库：**

第一次使用时，需要初始化本地 D1 数据库：

```bash
# 1. 先启动本地开发服务器（会自动创建本地数据库文件）
npm run dev:local

# 2. 在另一个终端窗口，运行初始化脚本
./setup-local-dev.sh

# 3. 重启开发服务器
# 按 Ctrl+C 停止，然后重新运行 npm run dev:local
```

### 2. 远程开发模式 (`npm run dev`)

**特点：**
- ✅ 使用远程预览环境资源
- ✅ 完整的数据和图片
- ❌ 需要稳定的网络连接
- ❌ **当前无法使用**（网络连接超时）

## 当前限制

### 本地模式的限制：

1. **本地 D1 数据库为空**
   - 首次使用需要运行 `./setup-local-dev.sh` 初始化
   - 只有 3 个示例产品（与预览 R2 中的 3 张图片对应）

2. **本地 R2 为空**
   - 图片无法从本地 R2 加载
   - 代码会尝试从预览 R2 加载图片（如果配置正确）
   - 如果图片不在预览 R2，会显示 404

3. **本地 KV 为空**
   - 网站设置使用默认值
   - 网站名称显示为 "hello"

### 图片问题：

**预览 R2 bucket（开发环境）：**
- ✅ product-1-robotic-arm.png
- ✅ product-2-iot-sensor.png
- ✅ product-3-laser-cutter.png
- ❌ product-4-press-machine.png (上传失败 - 网络问题)
- ❌ product-5-iot-control.png (未上传)
- ❌ product-6-cnc-machine.png (未上传)

**解决方案：**

网络稳定后，上传剩余图片：
```bash
wrangler r2 object put b2b-product-images-preview/product-4-press-machine.png --file=product-4-press-machine.png --remote
wrangler r2 object put b2b-product-images-preview/product-5-iot-control.png --file=product-5-iot-control.png --remote
wrangler r2 object put b2b-product-images-preview/product-6-cnc-machine.png --file=product-6-cnc-machine.png --remote
```

## 推荐开发流程

### 方案 A：本地开发 + 生产测试（推荐）

```bash
# 1. 本地开发前端代码
npm run dev:local

# 2. 修改代码后部署测试
npm run deploy

# 3. 在生产环境测试完整功能
# 访问: https://cf-b2b-website.raowenjieszu.workers.dev
```

**优点：**
- 本地快速开发前端
- 生产环境测试后端功能
- 避免网络连接问题

**缺点：**
- 部署后才能看到完整效果
- 生产数据库会包含测试数据

### 方案 B：仅本地开发（功能受限）

```bash
# 1. 初始化本地数据库（只需一次）
./setup-local-dev.sh

# 2. 启动本地开发
npm run dev:local

# 3. 测试前端功能
# - 图片可能不显示
# - 数据可能不完整
# - 但可以测试 UI/UX
```

## 环境配置总结

| 资源 | 生产环境 | 预览环境 (远程) | 本地环境 |
|------|---------|---------------|---------|
| D1 数据库 | b2b_database (6 products) | b2b_database_preview (6 products) | 本地 SQLite (需初始化) |
| R2 存储 | b2b-product-images (3 images) | b2b-product-images-preview (3 images) | 本地 R2 (空) |
| KV 存储 | STATIC_ASSETS (有设置) | STATIC_ASSETS_PREVIEW (有设置) | 本地 KV (空) |
| 访问方式 | npm run deploy | npm run dev (需要网络) | npm run dev:local |

## 故障排除

### 问题：API 返回 500 错误

**原因：** 本地 D1 数据库为空或表不存在

**解决：**
```bash
# 运行初始化脚本
./setup-local-dev.sh
```

### 问题：图片不显示

**原因：** 图片不在预览 R2 bucket 中

**解决：**
1. 检查预览 R2 中是否有图片
2. 网络稳定后上传缺失的图片
3. 或在生产环境测试（生产 R2 有部分图片）

### 问题：远程开发模式连接超时

**原因：** 网络无法连接到 Cloudflare 远程开发服务器

**解决：**
- 使用本地开发模式
- 或切换网络（如使用手机热点）
- 或直接在生产环境测试

## 快速参考

**开发前端代码：**
```bash
npm run dev:local
```

**部署到生产：**
```bash
npm run deploy
```

**初始化本地数据库：**
```bash
./setup-local-dev.sh
```

**上传图片到预览 R2：**
```bash
wrangler r2 object put b2b-product-images-preview/<filename> --file=<filename> --remote
```

**查询生产数据库：**
```bash
wrangler d1 execute b2b_database --remote --command="SELECT * FROM products"
```

**查询预览数据库：**
```bash
wrangler d1 execute b2b_database_preview --remote --command="SELECT * FROM products"
```
