/**
 * @param {import('probot').Probot} app
 */

module.exports = (app) => {
  app.log("Yay! The app was loaded!");

  app.on(
    ["pull_request.opened", "pull_request.edited", "pull_request.reopened"],
    async (context) => {
  
      if (context.payload.pull_request.title.indexOf('🤖') > -1) {
        await context.octokit.pulls.createReview({
          ...context.pullRequest(),
          event: 'APPROVE'
        })
      }
    }
  );

  app.on("issues.opened", async (context) => {
    return context.octokit.issues.createComment(
      context.issue({ body: "Hello, World!" })
    );
  });
};
