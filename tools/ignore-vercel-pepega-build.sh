# Add origin for git repositry
git remote add origin $GIT_CREDENTIALS

# Fetch remote main branch
git fetch origin main 

# Install @nrwl/workspace in order to run the affected command
npm install --no-package-lock --no-save @nrwl/workspace typescript --prefer-offline

# Run the affected command, comparing latest commit to origin/main
npx nx affected:libs --base=origin/main | grep $VERCEL_PROJECT_NAME -q

# Store result of the previous command (grep)
IS_AFFECTED=$?

if [ $IS_AFFECTED -eq 1 ]; then
  echo "🛑 - Build cancelled"
  exit 0
elif [ $IS_AFFECTED -eq 0 ]; then
  echo "✅ - Build can proceed"
  exit 1
fi