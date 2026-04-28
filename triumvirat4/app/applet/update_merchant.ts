import * as fs from 'fs';

let code = fs.readFileSync('server.ts', 'utf8');

// Replace action: 'buy_merchant' with 'view_merchant'
code = code.replace(/\{ action: 'buy_merchant', itemId: (.*?), price: (.*?) \}/g, "{ action: 'view_merchant', itemId: $1, price: $2 }");

const viewMerchantCode = `
        if (payloadAction === 'view_merchant') {
          const item = getItem(payloadItemId);
          if (!item) return;
          const customPrice = context.messagePayload.price || item.price;
          
          let statsText = '';
          if (item.stats) {
            statsText = '\\nХарактеристики:';
            Object.entries(item.stats).forEach(([stat, val]) => {
              statsText += \`\\n  \${stat}: \${(val as number) > 0 ? '+' : ''}\${val}\`;
            });
          }
          if (item.allowedClasses && item.allowedClasses.length > 0) {
            statsText += \`\\nДоступно классам: \${item.allowedClasses.join(', ')}\`;
          }

          const kb = Keyboard.builder()
            .textButton({ label: '💰 Купить', payload: { action: 'buy_merchant', itemId: payloadItemId, price: customPrice }, color: Keyboard.POSITIVE_COLOR })
            .textButton({ label: '⬅️ Назад', payload: { command: 'explore_merchant_back' }, color: Keyboard.SECONDARY_COLOR });
            
          await context.send({ message: \`\${item.name}\\nЦена: \${customPrice} 💰\\n\\n\${item.description}\${statsText}\`, keyboard: kb });
          return;
        }

        if (payloadCommand === 'explore_merchant_back') {
            if (!char.rpg.exploreMerchantItems || char.rpg.exploreMerchantItems.length === 0) {
                await context.send({ message: 'Торговец уже ушел.', keyboard: getWildKeyboard(char) });
                return;
            }
            let msg = \`🛒 Странствующий торговец\\n"Смотри, что у меня есть, путник!"\\nТвое золото: \${char.gold || 0} 💰\\n\\n\`;
            const keyboard = Keyboard.builder();
            
            char.rpg.exploreMerchantItems.forEach((itemIdStr: string, index: number) => {
               const iT = getItem(itemIdStr);
               if (iT) {
                  let displayPrice = iT.price;
                  if (iT.type === 'consumable') displayPrice = displayPrice * 2;
                  
                  msg += \`\${index + 1}. \${iT.name} — \${displayPrice} 💰\\n\`;
                  keyboard.textButton({ label: \`\${index + 1}\`, payload: { action: 'view_merchant', itemId: itemIdStr, price: displayPrice }, color: Keyboard.SECONDARY_COLOR });
                  if ((index + 1) % 4 === 0) keyboard.row();
               }
            });
            keyboard.row().textButton({ label: '⬅️ Уйти', payload: { command: 'explore_leave' }, color: Keyboard.SECONDARY_COLOR });
            await context.send({ message: msg, keyboard });
            return;
        }
`;

code = code.replace(/(if \(payloadAction === 'buy_merchant'\) \{)/, viewMerchantCode + '\n        $1');
fs.writeFileSync('server.ts', code);
