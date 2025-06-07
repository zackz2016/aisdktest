import { generateText } from 'ai';
import { xai } from '@ai-sdk/xai';
import 'dotenv/config'; // 使用 dotenv 加载 .env 文件中的环境变量

async function main() {
  try {
    console.log('正在调用 xAI 模型生成文本...');

    const { text, usage, finishReason } = await generateText({
      // 使用 xai 提供程序并指定模型 ID，例如 'grok-3'
      model: xai('grok-3'),

      // 提供您想要模型响应的提示
      prompt: '为一家新的素食咖啡馆写一句吸引人的广告语。',
    });

    console.log('\n--- 生成的文本 ---');
    console.log(text);
    console.log('------------------\n');
    console.log('完成原因:', finishReason);
    console.log('Token 使用情况:', usage);
  } catch (error) {
    console.error('发生错误:', error);
  }
}

main();