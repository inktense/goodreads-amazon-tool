// Function that scrolls on a pageuntil it reaches the end
export const autoScroll = async (page): Promise<void>  => {
    await page.evaluate(async () => {
      await new Promise<void>((resolve, reject)  => {
        let totalHeight = 0;
        const distance = 100;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
  
          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });
  }
