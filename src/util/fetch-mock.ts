export function fetchMock(data: any) {
  jest.spyOn(global, 'fetch').mockImplementation(jest.fn(() => Promise.resolve({ json: () => Promise.resolve(data) })) as jest.Mock);
}
