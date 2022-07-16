export function fetchMock(data: Record<string, any>): void {
  jest.spyOn(global, 'fetch').mockImplementation(jest.fn((url: string) => Promise.resolve({ json: () => Promise.resolve(data[url]) })) as jest.Mock);
}
