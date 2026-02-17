import { test, expect } from '@playwright/test'

test.describe('Personal Board E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    await page.reload()
  })

  test('homepage loads and shows welcome screen', async ({ page }) => {
    await expect(page.locator('text=Personal Board')).toBeVisible()
    await expect(page.locator('input[placeholder="AnonyDog"]')).toBeVisible()
    await expect(page.getByRole('button', { name: /save/i })).toBeVisible()
  })

  test('can enter username and navigate to dashboard', async ({ page }) => {
    await page.fill('input[placeholder="AnonyDog"]', 'TestUser')
    await page.click('button:has-text("Save")')
    
    await expect(page).toHaveURL('/dashboard')
    await expect(page.locator('text=Welcome, TestUser')).toBeVisible()
  })

  test('can create a new board', async ({ page }) => {
    await page.fill('input[placeholder="AnonyDog"]', 'TestUser')
    await page.click('button:has-text("Save")')
    await expect(page).toHaveURL('/dashboard')
    
    // Click create button
    await page.locator('button.n-base-icon').first().click()
    
    // Fill board form
    await expect(page.locator('text=New Board')).toBeVisible()
    await page.fill('input[placeholder="Board name"]', 'My Test Board')
    await page.fill('textarea[placeholder="Board description"]', 'Test Description')
    await page.click('button:has-text("Create")')
    
    // Wait for modal to close
    await expect(page.locator('.n-modal-mask')).not.toBeVisible()
    
    // Verify board was created
    await expect(page.locator('text=My Test Board')).toBeVisible()
  })

  test('can edit a board', async ({ page }) => {
    await page.fill('input[placeholder="AnonyDog"]', 'TestUser')
    await page.click('button:has-text("Save")')
    await page.locator('button.n-base-icon').first().click()
    await page.fill('input[placeholder="Board name"]', 'Original Board')
    await page.fill('textarea[placeholder="Board description"]', 'Original Desc')
    await page.click('button:has-text("Create")')
    await expect(page.locator('.n-modal-mask')).not.toBeVisible()
    
    // Edit board
    await page.locator('.n-button >> nth=1').click()
    await page.fill('input[placeholder="Board name"]', 'Updated Board')
    await page.click('button:has-text("Edit")')
    await expect(page.locator('.n-modal-mask')).not.toBeVisible()
    
    await expect(page.locator('text=Updated Board')).toBeVisible()
  })

  test('can delete a board', async ({ page }) => {
    await page.fill('input[placeholder="AnonyDog"]', 'TestUser')
    await page.click('button:has-text("Save")')
    await page.locator('button.n-base-icon').first().click()
    await page.fill('input[placeholder="Board name"]', 'Board To Delete')
    await page.fill('textarea[placeholder="Board description"]', 'Will be deleted')
    await page.click('button:has-text("Create")')
    await expect(page.locator('.n-modal-mask')).not.toBeVisible()
    
    // Delete board
    await page.locator('.n-button').filter({ hasText: /delete/i }).first().click()
    
    await expect(page.locator('text=Board To Delete')).not.toBeVisible()
  })

  test('can navigate to board and create lists/tasks', async ({ page }) => {
    // Create board first
    await page.fill('input[placeholder="AnonyDog"]', 'TestUser')
    await page.click('button:has-text("Save")')
    await page.locator('button.n-base-icon').first().click()
    await page.fill('input[placeholder="Board name"]', 'Task Board')
    await page.fill('textarea[placeholder="Board description"]', 'Task Board Desc')
    await page.click('button:has-text("Create")')
    await expect(page.locator('.n-modal-mask')).not.toBeVisible()
    
    // Navigate to board
    await page.click('text=Task Board')
    await expect(page.locator('h2:has-text("Task Board")')).toBeVisible()
    
    // Create list
    await page.click('button:has-text("Create list")')
    await page.fill('input[placeholder="Enter with list name"]', 'To Do')
    await page.click('button:has-text("Create")')
    await expect(page.locator('.n-modal-mask')).not.toBeVisible()
    await expect(page.locator('text=To Do')).toBeVisible()
    
    // Create task
    await page.click('button:has-text("+ Create task")')
    await page.fill('input[placeholder="Enter with task name"]', 'My First Task')
    await page.fill('textarea[placeholder="Enter with task description"]', 'Task description here')
    await page.click('button:has-text("Create")')
    await expect(page.locator('.n-modal-mask')).not.toBeVisible()
    
    await expect(page.locator('text=My First Task')).toBeVisible()
  })

  test('can delete a task', async ({ page }) => {
    await page.fill('input[placeholder="AnonyDog"]', 'TestUser')
    await page.click('button:has-text("Save")')
    await page.locator('button.n-base-icon').first().click()
    await page.fill('input[placeholder="Board name"]', 'Delete Board')
    await page.fill('textarea[placeholder="Board description"]', 'Test')
    await page.click('button:has-text("Create")')
    await expect(page.locator('.n-modal-mask')).not.toBeVisible()
    await page.click('text=Delete Board')
    await page.click('button:has-text("Create list")')
    await page.fill('input[placeholder="Enter with list name"]', 'List')
    await page.click('button:has-text("Create")')
    await expect(page.locator('.n-modal-mask')).not.toBeVisible()
    await page.click('button:has-text("+ Create task")')
    await page.fill('input[placeholder="Enter with task name"]', 'Task')
    await page.fill('textarea[placeholder="Enter with task description"]', 'Desc')
    await page.click('button:has-text("Create")')
    await expect(page.locator('.n-modal-mask')).not.toBeVisible()
    
    // Delete task
    await page.locator('.n-button').filter({ hasText: /delete/i }).first().click()
    
    await expect(page.locator('text=Task')).not.toBeVisible()
  })

  test('can go back to dashboard from board', async ({ page }) => {
    await page.fill('input[placeholder="AnonyDog"]', 'TestUser')
    await page.click('button:has-text("Save")')
    await page.locator('button.n-base-icon').first().click()
    await page.fill('input[placeholder="Board name"]', 'Back Board')
    await page.fill('textarea[placeholder="Board description"]', 'Test')
    await page.click('button:has-text("Create")')
    await expect(page.locator('.n-modal-mask')).not.toBeVisible()
    await page.click('text=Back Board')
    
    // Go back
    await page.click('a:has-text("Go back to dashboard")')
    
    await expect(page).toHaveURL('/dashboard')
  })

  test('validates empty fields on board creation', async ({ page }) => {
    await page.fill('input[placeholder="AnonyDog"]', 'TestUser')
    await page.click('button:has-text("Save")')
    await page.locator('button.n-base-icon').first().click()
    
    // Try to submit empty form
    await page.click('button:has-text("Create")')
    
    // Should show error
    await expect(page.locator('text=Please fill all fields')).toBeVisible()
  })
})
