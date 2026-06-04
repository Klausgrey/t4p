def max_list(nums, k):
	window_sum = 0
	m_sum = 0

	for i in range(k):
		window_sum += nums[i]

	m_sum = window_sum #max is 8

	for i in range(k, len(nums)):
		window_sum += nums[i]
		window_sum -= nums[i - k]
		m_sum = max(window_sum, m_sum)
	return m_sum

print(max_list([2, 1, 5, 1, 3, 2], 3))
# nums = [2, 1, 5, 1, 3, 2], k = 3